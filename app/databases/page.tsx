import { cookies } from 'next/headers';
async function fetchDb() {
    const access_token = cookies().get('access_token');
    console.log(access_token);
    const dbResponse = await fetch('https://api.notion.com/v1/search', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${access_token?.value}`,
            'Content-Type': 'application/json',
            'Notion-Version': '2022-06-28'
        },
        body: JSON.stringify({
            filter: {
                property: 'object',
                value: 'database'
            }
        })
    });

    const dbData = await dbResponse.json();
    console.log(dbData.results[0].title[0].plain_text);
    return dbData.results;

}

export default async function DatabasesPage(){
    const databases = await fetchDb();
    return (
        <div>
            <h1>Databases</h1>
            <ul>
                {databases.map((db) => (
                    <li key={db.id}><a href={`/databases/${db.id}`}>{db.title[0].plain_text}</a></li>
                ))}
            </ul>
        </div>
    );
} 