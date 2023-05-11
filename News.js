var spin = document.getElementById('spinner');


const loadCategory = () => {
  spin.style.display = 'block';
  fetch("https://openapi.programming-hero.com/api/news/categories")
    .then((res) => res.json())
    .then((data) => showCategory(data.data.news_category));
};

const showCategory = (categories) => {
  spin.style.display = 'none';
  const categoryContainer = document.getElementById("category-container");
  categories.forEach((category) => {
    categoryContainer.innerHTML += `<p class="nav-link" onclick="loadCategoryNews('${category.category_id}','${category.category_name}' )">${category.category_name}</p>`;
  });
};
const loadCategoryNews = (id, category_name) => {

  const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showCategoryNews(data.data, category_name));
    
};

const showCategoryNews = (newses,category_name)=>{
 

    const alertContainer = document.getElementById("alert")
    alertContainer.innerHTML = `${newses.length} Newses found for category ${category_name}`
    const newsContainer = document.getElementById("news-container")
    newsContainer.innerHTML=""
    newses.forEach(news=>newsContainer.innerHTML+=`<div class="card mb-3" >
    <div class="row g-0">
      <div class="col-md-4">
      ${news.thumbnail_url ?  `<img src=${news.thumbnail_url } class="img-fluid 
      rounded-start" alt="...">` : "https://cdn.pixabay.com/photo/2017/02/26/00/28/borders-2099198_960_720.png"}
       
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${news.title}</h5>
          <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
          
          
          <!-- Button trigger modal -->
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="fetchNewsDetail('${news._id}')">
            Details
          </button>

          
        </div>
      </div>
    </div>
  </div>`
    )
}
 const fetchNewsDetail=(id)=>{
 const link = `https://openapi.programming-hero.com/api/news/${id}`;
  fetch(link)
    .then((res) => res.json())
    .then((data) => showhNewsDetail(data.data[0]));
 }

 const showhNewsDetail =(news)=>{
   const modalBody = document.getElementById("modal-body");
   modalBody.innerHTML=` <div class="row g-0">
   <div class="col-md-4">
   ${news.thumbnail_url ?  `<img src=${news.thumbnail_url } class="img-fluid 
   rounded-start" alt="...">` : "https://cdn.pixabay.com/photo/2017/02/26/00/28/borders-2099198_960_720.png"}
    
   </div>
   <div class="col-md-8">
     <div class="card-body">
       <h5 class="card-title">${news.title} <span class="badge rounded-pill text-bg-success">${news.others_info.is_todays_pick?"Todays Pick":"Not Today's Pick"}</span>
       <span class="badge rounded-pill text-bg-primary">${news.others_info.is_trending?"Trending":"Not Trending"}</span></h5>
       <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
       <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
       
       
       <!-- Button trigger modal -->
       <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="fetchNewsDetail('${news._id}')">
         Close
       </button>

       
     </div>
   </div>
 </div>
</div>`
 }

loadCategory();

