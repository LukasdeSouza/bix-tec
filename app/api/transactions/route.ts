// app/api/transactions/route.ts
import fs from 'fs';
import path from 'path';

interface Transaction {
    date: number;
    amount: string;
    transaction_type: string;
    currency: string;
    account: string;
    industry: string;
    state: string;
}

interface PaginatedResponse {
    total: number;
    transactions: Transaction[];
}

export async function GET(req: Request): Promise<Response> {
    const filePath = path.join(process.cwd(), 'public', 'transactions.json');
    const jsonData = fs.readFileSync(filePath, 'utf8');
    const transactions: Transaction[] = JSON.parse(jsonData);

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') ?? "1") || 1;
    const limit = parseInt(searchParams.get('limit') ?? '20') || 20;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedTransactions = transactions.slice(startIndex, endIndex);

    const responsePayload: PaginatedResponse = {
        total: transactions.length,
        transactions: paginatedTransactions,
    };

    return new Response(JSON.stringify(responsePayload), {
        headers: { 'Content-Type': 'application/json' },
    });
}
