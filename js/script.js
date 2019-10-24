'use strict';
/*document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  });*/
  
  const titleClickHandler = function(event){
    const clickedElement = this;
    console.log(event);
    console.log('Link was clicked!');
    event.preventDefault();
  
    /*  [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
    event.preventDefault();
    console.log('clickedElement:', clickedElement);
      clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.post');

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }
  
    /* [DONE] get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    console.log(articleSelector);
    
    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    console.log(targetArticle);

    /* [DONE] add class 'active' to the correct article */
    targetArticle.classList.add('active');
  };
  
 
  
  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optTagsListSelector = '.tags.list';
    

  function generateTitleLinks(customSelector = ''){

  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  
  /* [DONE] for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
 
  let html = '';
  for (let article of articles) {

    /* [DONE] get the article id */
    const articleId = article.getAttribute('id');
    
    /* [DONE] find the title element and get the title from the title element*/
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    
    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);

    /* insert link into titleList - first way */
    html = html + linkHTML;
    }
    titleList.innerHTML = html;
  }
    /* for each article - second way */
    //const articles = document.querySelectorAll(optArticleSelector);
    //for (let article of articles) {
    /* insert link into titleList - second way */
    //document.querySelector('.titles').insertAdjacentHTML('beforeend', linkHTML);
  
  //}
//}

generateTitleLinks();
const links = document.querySelectorAll('.titles a');
    
for(let link of links){
  link.addEventListener('click', titleClickHandler);
}

/*TAGS*/
/* [NEW] function looking for the smallest and highest number of tags */
function calculateTagsParams(tags) {
  
  /* [NEW] create an object params with max and min values */
  const params = {
    max: 0,
    min: 999999
  };

  /* START LOOP: for every tag */  
  for(let tag in tags) {
    console.log(tag + ' is used ' + tags[tag] + ' times');
  
    /* [NEW] find the largest value and set it as params.max value */
    params.max = Math.max(tags[tag], params.max);

    /* [NEW] find the smallest value and set it as params.min value */
    params.min = Math.min(tags[tag], params.min);
  
  /*END LOOP: for every tag */
  }
  /*return object */
  return params;
}

function generateTags(){
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  
  /* START LOOP: for every article: */
  for (let article of articles) {

    /* find tags wrapper */
    const tagList = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);
  
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);
  
    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){
    console.log(tag);

      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
    
      /* add generated code to html variable */
      html = html + linkHTML;

      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    
    /* END LOOP: for each tag */
    }
    
    /* insert HTML of all the links into the tags wrapper */
    tagList.innerHTML = html;

  /* END LOOP: for every article: */
  }

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');

  /* [NEW] create variable for all links HTML code */
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams)
  let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){
      /* [NEW-IN PROGRESS] generate code of a link and add it to allTagsHTML */
      //allTagsHTML += tag + ' (' + allTags[tag] + ') ';
      allTagsHTML += '<li><a href="#tag-' + tag + '">' + tag + '(' + allTags[tag] + ')</a></li>';
     
  /* [NEW] END LOOP: for each tag in allTags: */
  }

  /* [NEW] add html from allTags to tagList */
  tagList.innerHTML = allTagsHTML;
  
}

generateTags();


function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  
  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for(let activeTag of activeTags){

    /* remove class active */
    activeTag.classList.remove('active');

  /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const targetTag = document.querySelectorAll('a[href="' + href + '"]');
  
  /* START LOOP: for each found tag link */
  for(let tagLink of targetTag) {
  
    /* add class active */
    tagLink.classList.add('active');

  /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}


function addClickListenersToTags(){

  /* find all links to tags */
  const tagLinks = document.querySelectorAll('[href^="#tag-"]');

  /* START LOOP: for each link */
  for(let tag of tagLinks) {

    /* add tagClickHandler as event listener for that link */
    tag.addEventListener('click', tagClickHandler);
  }
  
  /* END LOOP: for each link */
}

addClickListenersToTags();



/*AUTHOR*/
function generateAuthors(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  
  /* START LOOP: for every article: */
  for (let article of articles) {

    /* find author wrapper */
    const authorList = article.querySelector(optArticleAuthorSelector);
    
    /* make html variable with empty string */
    let html = '';

    /* get tags from data-author attribute */
    const articleAuthor = article.getAttribute('data-author');
      
    /* generate HTML of the link */
    const linkHTML = '<li><a href="#author-' + articleAuthor + '">' + articleAuthor + '</a></li>';
    
    /* add generated code to html variable */
    html = html + linkHTML;
    
    /* insert HTML of all the links into the author wrapper */
    authorList.innerHTML = html;

  /* END LOOP: for every article: */
  }
}

generateAuthors();


function authorClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  
  /* make a new constant "author" and extract author from the "href" constant */
  const author = href.replace('#author-', '');
  
  /* find all author links with class active */
  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

  /* START LOOP: for each active tag link */
  for(let activeAuthor of activeAuthors){

    /* remove class active */
    activeAuthor.classList.remove('active');

  /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const targetAuthor = document.querySelectorAll('a[href="' + href + '"]');
  
  /* START LOOP: for each found tag link */
  for(let authorLink of targetAuthor) {
  
    /* add class active */
    authorLink.classList.add('active');

  /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors(){

  /* find all links to authors */
  const authorLinks = document.querySelectorAll('[href^="#author-"]');

  /* START LOOP: for each link */
  for(let author of authorLinks) {

    /* add authorClickHandler as event listener for that link */
    author.addEventListener('click', authorClickHandler);
  }
  
  /* END LOOP: for each link */
}

addClickListenersToAuthors();


