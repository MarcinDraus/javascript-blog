'use strict';
{
  const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  
    console.log('Link was clicked!', event);
  
  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active'/*<ul> <li><a> "a=#"*/);
    for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
    }
  /* [done] add class 'active' to the clicked link */
  clickedElement.classList.add('active');
    console.log('clickedElement', clickedElement);

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.post'/*'.post'<article> <h3> <p> <div>*/);
  for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }

  /* [done] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href'/*href="#article-9"*/);
    console.log(articleSelector)

  /* [done] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector/*href="#article-9"*/);
    console.log(targetArticle)

  /* [done] add class 'active' to the correct article */
  targetArticle.classList.add('active');
  }



  const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

  function generateTitleLinks(){
    
    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector/*'.titles'ul*/);
    titleList.innerHTML = '';
    /* find all the articles and save them to variable: articles */
    /* for each article */
    const articles = document.querySelectorAll(/*'.post'<article> <h3> <p> <div>*/optArticleSelector);

    let html = '';

    for(let article of articles){
    
    /* get the article id */
    const articleId = article.getAttribute('id'/*<article class="post active" id="article-1">*/);
    console.log(articleId)
    
    /* find the title element */
    const articleTitleElement = article/*<article> */.querySelector(optTitleSelector/*'.post-title'<h3>Article-1</h3>*/)
   
    /* get the title from the title element */
    const articleTitle = articleTitleElement/*<h3>Article-1</h3>*/.innerHTML;
    
    /* create HTML of the link */
    const linkHTML =
        '<li><a href="#' + articleId + '"<span>' + articleTitle + "</span></a></li>";
    
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
