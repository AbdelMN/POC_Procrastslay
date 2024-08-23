import { cookies } from 'next/headers';
async function fetchDb(id: string) {
    const access_token = cookies().get('access_token');
    console.log(access_token);
    const dbResponse = await fetch(`https://api.notion.com/v1/databases/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${access_token?.value}`,
            'Content-Type': 'application/json',
            'Notion-Version': '2022-06-28'
        }
    });

    const dbData = await dbResponse.json();
    console.log(dbData);
    return dbData;
}

export default async function DatabasePage({params}: {params: {id: string}}){
    const db = await fetchDb(params.id);
    return (
        <div>
            <h1>{db.title[0].plain_text}</h1>
            <ul>
            {Object.entries(db.properties).map(([key, prop]) => (
                    <li key={key}>{prop.name}</li>
                ))}
            </ul>
        </div>
    );
}