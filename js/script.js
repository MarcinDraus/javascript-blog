'use strict';
{
const titleClickHandler = function(event){
event.preventDefault();
const clickedElement = this;
  
console.log('Link was clicked!', event);

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll ('.titles a.active');
  for(let activeLink of activeLinks){
  activeLink.classList.remove('active');
  }  
  
  /* [done] add class 'active' to the clicked link */
  clickedElement.classList.add('active');
  console.log('clickedElement', clickedElement);

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll(".post");
  for (let activeArticle of activeArticles) {
  activeArticle.classList.remove("active");
  }

  /* [done] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector)

  /* [done] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
   console.log(targetArticle)

  /* [done] add class 'active' to the correct article */
  targetArticle.classList.add('active');
}

  const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

  function generateTitleLinks() {
    
    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    /* find all the articles and save them to variable: articles */
    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector);

    let html = '';

      for(let article of articles){
          
      /* get the article id */
      const articleId = article.getAttribute('id');
      console.log(articleId)
          
      /* find the title element */
      const articleTitleElement = article.querySelector(optTitleSelector)
        
      /* get the title from the title element */
      const articleTitle = articleTitleElement.innerHTML;
          
      /* create HTML of the link */
      const linkHTML ='<li><a href="#' + articleId + '"<span>' + articleTitle + "</span></a></li>";
          
      /* insert link into html variable */
      html = html + linkHTML;
      }
    titleList.innerHTML = html;
  }
  generateTitleLinks();
  const links = document.querySelectorAll(".titles a");
  console.log(links)
  for (let link of links) {
    link.addEventListener("click", titleClickHandler);
  }
}
