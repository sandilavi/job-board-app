import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//Read
export async function GET() {
    try {
        const jobs = await prisma.job.findMany();
        return new Response(JSON.stringify(jobs), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }
    catch (error) {
        return new Response(
            JSON.stringify({error: 'Error feteching jobs', message: error.message}),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                }
            });
    }
}

//Create
export async function POST(req) {
    try {
        const body = await req.json(); //Reads the request body(which comes from frontend)

        const job = await prisma.job.create ({ //Adds a new row to the Job table
            data: {
                position: body.position,
                company: body.company,
                location: body.location,
                jobType: body.jobType,
                postedDate: body.postedDate,
                userId: body.userId
            }
        })
        return Response.json(job); //Returns the newly created job
        }
    catch (error) {
        return Response.json({error:"Failed to post job!"})
    }   
}
