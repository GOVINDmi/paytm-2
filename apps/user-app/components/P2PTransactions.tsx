import { Card } from "@repo/ui/card";

export const P2PTransactions = ({
    transactions,
    currentUserId
}: {
    transactions: {
        timestamp: Date;
    amount: number;
    fromUserId: number;
    fromUser: { name: string | null };  
    toUserId: number;
    toUser: { name: string | null };
    }[],
    currentUserId: number
}) => {
    if (!transactions.length) {
        return (
            <Card title="Peer-to-Peer Transactions">
                <div className="text-center pb-8 pt-8">
                    No recent transactions
                </div>
            </Card>
        );
    }

    return (
        <Card title="Peer-to-Peer Transactions">
            <div className="pt-2">
                {transactions.map((t) => {
                    // Determine if the transaction is a send or receive
                    const isSend = t.fromUserId === currentUserId;
                    const transactionSymbol = isSend ? "-" : "+";
                    const counterpartName = isSend ? t.toUser.name : t.fromUser.name;

                    return (
                        <div key={t.timestamp.toString()} className="flex justify-between mb-4 border-b pb-2">
                            <div>
                                <div className="text-sm">
                                    {isSend ? "Sent to" : "Received from"} {counterpartName}
                                </div>
                                <div className="text-slate-600 text-xs">
                                    {t.timestamp.toDateString()}
                                </div>
                            </div>
                            <div className="flex flex-col justify-center text-right">
                                <span className={`text-lg ${isSend ? "text-red-500" : "text-green-500"}`}>
                                    {transactionSymbol} Rs {t.amount / 100}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
};
