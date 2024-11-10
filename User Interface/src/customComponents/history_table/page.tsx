import { Video, columns } from "./columns"
import { DataTable } from "./data-table"

//async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
function getData(): Video[]{
  return [
    {
      id: "723ed52f",
      Name: "Shivam Tripathi",
      Date: "21/06/2002",
      email: "211B293@juetguna.in",
    },
    {
        id: "75553d52f",
        Name: "Pankaj Kushwah",
        Date: "21/03/2002",
        email: "211B201@juetguna.in",
      },
      {
        id: "73mfkrm52f",
        Name: "Hrishikesh Bhatt",
        Date: "14/02/2002",
        email: "211B139@juetguna.in",
      },
    // ...
  ]
}

export default  function DemoPage() {
  const data =  getData()

  return (
    <div className="container mx-auto py-10 bg-white w-full">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
