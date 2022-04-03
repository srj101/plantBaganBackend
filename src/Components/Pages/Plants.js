import React,{useEffect} from 'react'
import { gql,useQuery ,useMutation} from '@apollo/client'
import { Link } from 'react-router-dom';

const GET_PLANTS = gql`
query getPlants{
  getPlants {
    id
    SKU
    stock
    new
    categoryId
    rating
    price
    tags
    name
    image
  }
}
`;

const PLANT_DELETE = gql`
mutation($deletePlantId: String!){
  deletePlant(id: $deletePlantId)
}

`;
// plant related product
// Offer page with offer products and coruses

function Plants() {
  let str;
  const { loading, error, data ,refetch} = useQuery(GET_PLANTS);
  const [deletePlant, { dataa, loadingg, errorr }] = useMutation(PLANT_DELETE);

  if (loading || loadingg) return <p>Loading...</p>;
    if (error || errorr) return <p>Error :(</p>;
  return (
    <div className='plants_page'>
        <button type="button" class="btn btn-light mt-4"><Link to="/plants/create">Add new Plant</Link></button>
        <figure class="text-center">
            <blockquote class="blockquote">
                <p><b>Plants List</b></p>
            </blockquote>
            <figcaption class="blockquote-footer">
                <cite title="Source Title">Add Update Delete Plants</cite>
            </figcaption>
            </figure>
        <table class="table table-hover table-responsive">
            
            <thead className='table-dark'>
                <tr>
                    <th>ID</th>
                    <th>SKU</th>
                    <th>Stock</th>
                    <th>New</th>
                    <th>Name</th>
                    <th>Category ID</th>
                    <th>Image</th>
                    <th>Rating</th>
                    <th>Price</th>
                    <th>Tags</th>
                    <th>DELETE</th>
                    <th>EDIT</th>
                </tr>
            </thead>
            <tbody>
                
                {
                    data.getPlants.map(plant => (
                        <tr>
                            <td>{plant.id}</td>
                            <td>{plant.SKU}</td>
                            <td>{plant.stock}</td>
                            <td>{plant.new? `True`:`False`}</td>
                            <td>{plant.name}</td>
                            <td>{plant.categoryId}</td>
                            <td>{plant.image}</td>
                            <td>{Array(plant.rating)
                        .fill(1)
                        .map((el, i) => (
                            <span>⭐</span>
                        ))}
                    </td>
                            <td>${plant.price}</td>
                            <td>{plant.tags.map(tag=> (
                              <td key={tag}>{tag},</td>
                            ))}</td>
                            <td className='deletebutton' onClick={async(e)=>
                            {   await deletePlant({
                                variables: {
                                  deletePlantId: plant.id
                                }})
                                window.location.reload(false)
                                }}>X</td>
                                <td className='editbutton'><Link to={`edit/${plant.id}`} key={plant.id}>Edit</Link></td>
                        </tr>
                        
                    ))
                }
                
            </tbody>
        </table>
    </div>
  )
}

export default Plants