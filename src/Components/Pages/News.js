import React, { useEffect } from 'react'
import { gql,useQuery ,useMutation} from '@apollo/client'
import { Link } from 'react-router-dom';

const GET_NEWS = gql`
query {
  getNews{
    id
    title
    featuredImage
    postedBy
    date
    description
    userId
  }
}
`;

const NEWS_DELETE = gql`

mutation($deleteNewsId: String!) {
  deleteNews(id: $deleteNewsId)
}

`;

function News() {

  const { loading, error, data ,refetch} = useQuery(GET_NEWS);
  const [deleteNews, deletedNews] = useMutation(NEWS_DELETE);

  if (loading || deletedNews.loading) return <p>Loading...</p>;
  if (error || deletedNews.error) return <p>Error :(</p>;
  

  return (
    <div className='news_page'>
        <button type="button" class="btn btn-light mt-4"><Link to="/news/create">Add new News</Link></button>
        <figure class="text-center">
            <blockquote class="blockquote">
                <p><b>News List</b></p>
            </blockquote>
            <figcaption class="blockquote-footer">
                <cite title="Source Title">Add Update Delete News</cite>
            </figcaption>
            </figure>
        <table class="table table-hover table-responsive">
            
            <thead className='table-dark'>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Image</th>
                    <th>Posted By</th>
                    <th>Date</th>
                    <th>Author ID</th>
                    <th>DELETE</th>
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody>
                
                {
                    data?.getNews?.map(news => (
                        <tr key={news.id}>
                            <td>{news.id}</td>
                            <td>{news.title}</td>
                            <td>{news.featuredImage}</td>
                            <td>{news.postedBy}</td>
                            <td>{news.date}</td>
                            <td>{news.userId}</td>
                            
                            <td className='deletebutton' onClick={async(e)=>
                            {   await deleteNews({
                                variables: {
                                  deleteNewsId: news.id
                                }})
                                window.location.reload(false)
                                }}>X</td>
                                <td className='editbutton'><Link to={`edit/${news.id}`} key={news.id}>Edit</Link></td>
                        </tr>
                        
                    ))
                }
                
            </tbody>
        </table>
    </div>
  )
}

export default News