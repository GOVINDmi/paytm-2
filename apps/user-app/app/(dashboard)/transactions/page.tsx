import prisma from "@repo/db/client";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { P2PTransactions } from "../../../components/P2PTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

async function getBalance() {
    const session = await getServerSession(authOptions);
    const balance = await prisma.balance.findFirst({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    };
}

async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return txns.map(t => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }));
}

async function getP2PTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.p2pTransfer.findMany({
        where: {
            OR: [
                { fromUserId: Number(session?.user?.id) },
                { toUserId: Number(session?.user?.id) }
            ]
        },
        include: {
            fromUser: { select: { name: true } },
            toUser: { select: { name: true } }
        }
    });

    return txns.map(t => ({
        timestamp: t.timestamp,
        amount: t.amount,
        fromUserId: t.fromUserId,
        fromUser: t.fromUser,
        toUserId: t.toUserId,
        toUser: t.toUser
    }));
}

export default async function TransferPage() {
    const session = await getServerSession(authOptions);
    const balance = await getBalance();
    const onRampTransactions = await getOnRampTransactions();
    const p2pTransactions = await getP2PTransactions();

    return (
        <div className="w-screen">
            <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
                Transfer
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
                <div>
                    
                    <div className="pt-4">
                        <OnRampTransactions transactions={onRampTransactions} />
                    </div>
                    <div className="pt-4">
                        <P2PTransactions transactions={p2pTransactions} currentUserId={Number(session?.user?.id)} />
                    </div>
                </div>
            </div>
        </div>
    );
}
