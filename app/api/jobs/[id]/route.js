import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//Delete
export async function DELETE(_, {params}) {
    const {id} = params;

    try {
        const job = await prisma.job.delete({
            where: {id: parseInt(id)},
        });
        return new Response(JSON.stringify(job), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        return new Response (
            JSON.stringify({error:'Error deleting job', message: error.message}),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    }
}
