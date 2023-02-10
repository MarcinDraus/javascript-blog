
'use strict';
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  articleTag: Handlebars.compile(document.querySelector('#template-article-tag').innerHTML),
  articleAuthor: Handlebars.compile(document.querySelector('#template-article-author').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML),
};
  const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';
  const  optArticleTagsSelector = '.post-tags .list';
  const optArticleAuthorSelector = '.post-author';
  const optTagsListSelector = '.tags.list';
  const optCloudClassCount = '5';
  const optCloudClassPrefix = 'tag-size-';
  const optAuthorsListSelector = '.list.authors';

const titleClickHandler = function(event){
event.preventDefault();
const clickedElement = this;
  
console.log('Link was clicked!', event);

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
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
  
  const generateTitleLinks = function (selector = '') {
    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    /* find all the articles and save them to variable: articles */
    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector + selector);

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
      /*const linkHTML ='<li><a href="#' + articleId + '"<span>' + articleTitle + "</span></a></li>";*/
      const linkHTMLData = {id: articleId, title: articleTitle};
      const linkHTML = templates.articleLink(linkHTMLData);    

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


  function calculateTagsParams(tags) {
    const params = { min: "999999", max: "0" };
  
    for (let tag in tags) {
      console.log(tag + " is used " + tags[tag] + "times");
  
      if (tags[tag] > params.max) {
        params.max = tags[tag];
      }
      if (tags[tag] < params.min) {
        params.min = tags[tag];
      }
    }
    return params;
  }
  function calculateTagClass(count, params) {
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
    return optCloudClassPrefix + classNumber;
  }
/*const  optArticleTagsSelector = '.post-tags .list';*/
const generateTags = function (){

   /* [NEW] create a new variable allTags with an empty object */
   let allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector/*.post*/);
  /* make html variable with empty string */
  let html = ""; 
  /* START LOOP: for every article: */
  for(let article of articles) {
    /* find tags wrapper */
  const wrapper = article.querySelector(optArticleTagsSelector/*.post-tags .list*/)
    /* make html variable with empty string */
  //let html = " ";
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags)
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){
      /* generate HTML of the link */
        console.log(tag)  
        //const linkHTML = '<li><a href="#tag-' + tag +'">' + tag + '</a></li>';
        const linkHTMLData = {id: tag, title: tag};
        const linkHTML = templates.articleTag(linkHTMLData);
        /* add generated code to html variable */
        html = html + ' ' + linkHTML;
        console.log(html);    
        /* [NEW] check if this link is NOT already in allTags */
        if (!allTags[tag]) {
          /* [NEW] add tag to allTags object */
          allTags[tag] = 1;
          //html = html + " " + linkHTML;
          /* add generated code to html variable */
        } else {
          allTags[tag]++;
        }
    }
    /* insert HTML of all the links into the tags wrapper */
    wrapper.innerHTML = html;
  /* END LOOP: for every article: */
  }
/* [NEW] find list of tags in right column */
const tagList = document.querySelector(optTagsListSelector);

const tagsParams = calculateTagsParams(allTags);
console.log("tagsParams:", tagsParams);

//[> [NEW] create variable for all links HTML code <]
//let allTagsHTML = "";
const allTagsData = {tags: []};

//[> [NEW] START LOOP: for each tag in allTags: <]
for (let tag in allTags) {
  //[> [NEW] generate code of a link and add it to allTagsHTML <]
//  const tagLinkHTML =
//     `<li><a class=" ${calculateTagClass(
//       allTags[tag],
//       tagsParams
//     )}" href="#tag-` +
//     tag +
//     '"><span>' +
//     tag +
//     " (" +
//     allTags[tag] +
//     ")" +
//     "</span></a></li>";
  //allTagsHTML += tagLinkHTML;
  allTagsData.tags.push({
    tag: tag,
    count: allTags[tag],
    className: calculateTagClass(allTags[tag], tagsParams)
  });
  /*const linkHTMLData = {id: tag, title: tag};
      const linkHTML = templates.tagCloudLink(linkHTMLData)*/
  // allTagsData.tags.push({
  //   tag: tag,
  //   count: allTags[tag],
  //   className: calculateTagClass(allTags[tag], tagsParams)
  // });

  //[> [NEW] END LOOP: for each tag in allTags: <]
}
//[>[NEW] add HTML from allTagsHTML to tagList <]
//tagList.innerHTML = allTagsHTML;
tagList.innerHTML = templates.tagCloudLink(allTagsData);
console.log(allTagsData);
}
generateTags();

 const tagClickHandler = function(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', ''); 
  /* find all tag links with class active */
  const allTagsLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for(let allTagsLink of allTagsLinks){
    
    /* remove class active */
    allTagsLink.classList.remove("active");
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagsLinksHref=  document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for(let tagLinkHref of tagsLinksHref ){
    /* add class active */
    tagLinkHref.classList.add("active")
  /* END LOOP: for each found tag link */
 }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

 const addClickListenersToTags = function(){
  /* find all links to tags */
  const links = document.querySelectorAll(/*'.list.list-horizontal a'*/'a[href^="#tag-"]'/*".list.tags a" */)

  /* START LOOP: for each link */
  for(const link of links){
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click',tagClickHandler);
    }
  }

addClickListenersToTags();


/*const optArticleAuthorSelector = '.post-author';*/
const generateAuthors = function(){

  /* [NEW] create a new variable allAuthors with an empty array */
  let allAuthors = {};

const articles = document.querySelectorAll(optArticleSelector/*.post*/)
/* make html variable with empty string */
  let html = " ";
  /* START LOOP: for every article: */
  for(let article of articles) {
  /* find tags wrapper */
  const authorWrapper = article.querySelector(optArticleAuthorSelector)
  /* get tags from data-author attribute */
  const articleAuthor = article.getAttribute('data-author');
  console.log('articleAuthor',articleAuthor)

  /*generate HTML of the link */
  //const authorHtml = '<a href="#tagAuthor-' + articleAuthor + '">' + articleAuthor + '</a>';

  const linkHTMLData = {id: articleAuthor, title: articleAuthor};
  const linkHTML = templates.articleAuthor(linkHTMLData);

  /* add generated code to html variable */
 // html = html + ' ' + linkHTML;
  
  /* [NEW] check if this link is NOT already in allTags */
  if (!allAuthors[articleAuthor]) {
    /* [NEW] add tag to allTags object */
    allAuthors[articleAuthor] = 1;
    /* add generated code to html variable */
    html = html + " " + linkHTML;
        } else {
    allAuthors[articleAuthor]++;
    }
  /* insert HTML of all the links into the tags wrapper */
  authorWrapper.innerHTML = html;

  /* END LOOP: for every article: */
  }
    /* [NEW] find list of tags in right column */
    const authorList = document.querySelector(optAuthorsListSelector/*'.list.authors'*/);
    //authorList.innerHTML = html
     //[> [NEW] create variable for all links HTML code <]
    // let allAuthorsHTML = "";
     const allTagsData = {tags: []};
     //[> [NEW] START LOOP: for each tag in allTags: <]
      for (let author in allAuthors) {
        //[> [NEW] generate code of a link and add it to allTagsHTML <]
        /*const authorLinkHTML =
          '<li><a href="#tagAuthor-' +
          author +
          '"><span>' +
          author +
          " (" +
          allAuthors[author] +
          ")" +
          "</span></a></li>";*/
          allTagsData.tags.push({
            tag: author,
            count: allAuthors[author],
            });
          //allAuthorsHTML += /*authorLinkHTML;*/templates.authorCloudLink(allTagsData)
        //[> [NEW] END LOOP: for each tag in allTags: <]
      }
      //[>[NEW] add HTML from allTagsHTML to tagList <]
      authorList.innerHTML =/* allAuthorsHTML;*/templates.authorCloudLink(allTagsData)
}
generateAuthors();

const authorClickHandler = function(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tagAuthor = href.replace('#tagAuthor-', ''); 
  /* find all tag links with class active */
  const authors = document.querySelectorAll('a.active[href^="#tagAuthor-"]');
  /* START LOOP: for each active tag link */
    for(let author of authors){
      console.log(authors, 'authors')
      /* remove class active */
      author.classList.remove("active");
      /* END LOOP: for each active tag link */
      }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const authorsLinksHref =  document.querySelectorAll('a[href="' + href + '"]');
    
    /* START LOOP: for each found author link */
    for(let authorLinkHref of authorsLinksHref){
      /* add class active */
      authorLinkHref.classList.add("active");
    } /*End Loop*/
     /* execute function "generateTitleLinks" with article selector as argument */
     generateTitleLinks('[data-author="' + tagAuthor + '"]')
  }
  
  const addClickListenersToAuthors = function(){
    const linksAuthors = document.querySelectorAll(/*'.post-author a'*/'a[href^="#tagAuthor-"]')
  
    /* START LOOP: for each link */
    for(const linkAuthor of linksAuthors){
      /* add tagClickHandler as event listener for that link */
      linkAuthor.addEventListener('click',authorClickHandler);
    }
  }
  addClickListenersToAuthors();
