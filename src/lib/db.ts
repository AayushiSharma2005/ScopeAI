import { MongoClient, ObjectId, type Collection } from "mongodb";
import type { IdeaInput, LeadInput, Proposal, Status } from "./schema";
import { generateDemoProposal } from "./mock";

export interface ProposalDoc {
  _id: ObjectId;
  input: IdeaInput;
  proposal: Proposal;
  source: "ai" | "demo";
  lead?: LeadInput & { createdAt: Date };
  status: Status;
  createdAt: Date;
}

// In-Memory store fallback for zero-configuration and local development
const globalStore = globalThis as unknown as {
  _mongoClient?: Promise<MongoClient>;
  _memoryProposals?: ProposalDoc[];
};

function seedInitialProposals(): ProposalDoc[] {
  const sample1Input: IdeaInput = {
    idea: "A secure digital health and clinical consultation suite where patients book appointments, conduct encrypted video visits, and manage prescription history.",
    platform: "Web + Mobile",
    budget: "$25k - $50k",
    timeline: "2 - 4 months",
    web3: false,
  };
  const sample1Proposal = generateDemoProposal(sample1Input);

  const sample2Input: IdeaInput = {
    idea: "Autonomous B2B SaaS logistics and multi-warehouse freight dispatch platform with real-time route optimization and IoT sensor tracking.",
    platform: "Web",
    budget: "$50k+",
    timeline: "4 - 6 months",
    web3: false,
  };
  const sample2Proposal = generateDemoProposal(sample2Input);

  const id1 = new ObjectId();
  const id2 = new ObjectId();

  return [
    {
      _id: id1,
      input: sample1Input,
      proposal: sample1Proposal,
      source: "demo",
      status: "Contacted",
      lead: {
        name: "Eleanor Vance",
        email: "eleanor.vance@apexhealth.co",
        company: "Apex Healthcare Systems",
        phone: "+1 (555) 349-8820",
        message: "Looking to deploy MVP to 3 pilot hospitals by Q3. Ready for technical scoping call.",
        createdAt: new Date(Date.now() - 3600 * 1000 * 24 * 2),
      },
      createdAt: new Date(Date.now() - 3600 * 1000 * 24 * 2),
    },
    {
      _id: id2,
      input: sample2Input,
      proposal: sample2Proposal,
      source: "demo",
      status: "New",
      lead: {
        name: "Marcus Sterling",
        email: "m.sterling@freightflow.io",
        company: "FreightFlow Logistics",
        phone: "+1 (555) 782-9901",
        message: "Need integration with existing ERP and telematics APIs.",
        createdAt: new Date(Date.now() - 3600 * 1000 * 6),
      },
      createdAt: new Date(Date.now() - 3600 * 1000 * 8),
    },
  ];
}

function getMemoryStore(): ProposalDoc[] {
  if (!globalStore._memoryProposals) {
    globalStore._memoryProposals = seedInitialProposals();
  }
  return globalStore._memoryProposals;
}

class MemoryCollection {
  async insertOne(doc: Omit<ProposalDoc, "_id"> & { _id?: ObjectId }) {
    const store = getMemoryStore();
    const finalDoc: ProposalDoc = {
      ...doc,
      _id: doc._id || new ObjectId(),
    };
    store.unshift(finalDoc);
    return { insertedId: finalDoc._id, acknowledged: true };
  }

  async findOne(filter: { _id?: ObjectId; [key: string]: unknown }): Promise<ProposalDoc | null> {
    const store = getMemoryStore();
    if (filter._id) {
      const match = store.find((d) => d._id.toString() === filter._id!.toString());
      return match ? { ...match } : null;
    }
    return null;
  }

  find(filter: { lead?: { $exists: boolean }; [key: string]: unknown } = {}) {
    const store = getMemoryStore();
    let results = [...store];

    if (filter?.lead?.$exists) {
      results = results.filter((d) => Boolean(d.lead));
    }

    return {
      sort(_sortSpec: Record<string, number>) {
        results.sort((a, b) => {
          const aTime = a.lead?.createdAt?.getTime() || a.createdAt.getTime();
          const bTime = b.lead?.createdAt?.getTime() || b.createdAt.getTime();
          return bTime - aTime;
        });
        return this;
      },
      limit(n: number) {
        results = results.slice(0, n);
        return this;
      },
      async toArray(): Promise<ProposalDoc[]> {
        return results.map((d) => ({ ...d }));
      },
    };
  }

  async updateOne(
    filter: { _id?: ObjectId; lead?: { $exists: boolean } },
    update: { $set?: Partial<ProposalDoc> }
  ) {
    const store = getMemoryStore();
    const index = store.findIndex((d) => {
      if (filter._id && d._id.toString() !== filter._id.toString()) return false;
      if (filter.lead?.$exists && !d.lead) return false;
      return true;
    });

    if (index === -1) {
      return { matchedCount: 0, modifiedCount: 0, acknowledged: true };
    }

    if (update.$set) {
      store[index] = {
        ...store[index],
        ...update.$set,
      };
    }

    return { matchedCount: 1, modifiedCount: 1, acknowledged: true };
  }

  async countDocuments(): Promise<number> {
    return getMemoryStore().length;
  }
}

const memoryCollectionInstance = new MemoryCollection();

async function getClient(): Promise<MongoClient | null> {
  const uri = process.env.MONGODB_URI?.trim();
  if (!uri) return null;

  try {
    if (!globalStore._mongoClient) {
      globalStore._mongoClient = new MongoClient(uri, { serverSelectionTimeoutMS: 4000 }).connect();
    }
    return await globalStore._mongoClient;
  } catch (err) {
    console.warn("[MongoDB] Connection could not be established. Falling back to In-Memory store.", err);
    return null;
  }
}

export async function proposals(): Promise<Collection<ProposalDoc>> {
  const client = await getClient();
  if (client) {
    try {
      const col = client.db(process.env.MONGODB_DB || "scopeai").collection<ProposalDoc>("proposals");
      return col;
    } catch {
      // Fallback
    }
  }
  return memoryCollectionInstance as unknown as Collection<ProposalDoc>;
}

export function toObjectId(id: string): ObjectId | null {
  return ObjectId.isValid(id) && String(new ObjectId(id)) === id ? new ObjectId(id) : null;
}

