
// This is the module that contains the news object

let newsArr = [{
    newsAuthor: 'Kristina Castle',
    newsTitle: 'The Benefits of Vitamin D & How to Get it',
    newsSummary: 'Get on the knowledge side of Vitamin D and you will forever cherish the decision.', 
    newsImage: './images/news/vegetables.jpeg',
    newsPath: '',
    publishedDate: 25,
    publishedMonth: 11,
}, {
    newsAuthor: 'Alex Louis',
    newsTitle: 'Our Favourite Summertime Tomato',
    newsSummary: 'Have you ever tasted tomatoes. Our special summertime tomato will get you into the realms of revels.', 
    newsImage: './images/news/tomatoes.jpeg',
    newsPath: '',
    publishedDate: 25,
    publishedMonth: 11,
}]

function displayNews(newsArr,startNo,number,container) {
    // there are 4 parameters to take in
    // newsArr => The array containing a list of news topic
    // startNo => the number to start splicing from
    // number => the number of items to take
    // container => the container to append the templates created

    let items = newsArr.slice(startNo, startNo + number);
    //create the templates for the loaded products   
    items.forEach(news => {
        let eachNews =  newsTemplate(news);
        // append the created template
        container.appendChild(eachNews);

    })
    console.log(newsArr[0].newsImage);
}



function newsTemplate(news) {
    //The div that will house the template
    let newsTemplate = document.createElement('div');
    newsTemplate.setAttribute('class', 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 items-center justify-center -mb-32 sm:mb-0 sm:-mr-16 lg:-mb-32 lg:mr-0');
    // Set the template

    newsTemplate.innerHTML = `<!-- The date item -->
    <div class="w-full min-h-[315px] sm:h-[320px] md:h-[330px] lg:h-[280px] bg-[url('${news.newsImage}')] bg-cover bg-center rounded-3xl relative overflow-hidden">
    <img class="absolute w-full h-full z-[2] object-cover object-center" src="${news.newsImage}" class="w-36 h-8">
        <div class="min-w-[50px] min-h-[50px] bg-white rounded-full inline-flex flex-col justify-center items-center text-base text-[#274C5B] m-5 relative z-[3]">
            <h5 class="leading-[1.1] text-center font-bold">${news.publishedDate} 
            <br> ${news.publishedMonth}
            </h5>
        </div>
    </div>

    <!-- The news text -->
    <div class="newsText transitions h-min lg:h-[280px] bg-[#FFFFFF] rounded-[18px] px-8 pt-7 pb-10  shadow-md shadow-black w-[95%] sm:w-auto md:w-[95%] m-auto relative z-10">
        <!-- The author -->
        <div class="flex items-end gap-1 mb-4">
            <span class="text-[#EFD372] flex items-end"><i class="fa-solid fa-user leading-none"></i></span>
            <span class="text-[#274C5B] text-base font-normal leading-none translate-y-0.5">${news.newsAuthor}</span>
        </div>

        <div class="mb-5">
            <h5 class="font-['Roboto'] text-lg font-bold text-[#274C5B]">${news.newsTitle}</h5>
            <p class="font-['Open Sans'] text-base text-[#274C5B]">${news.newsSummary}</p>
        </div>

        <!-- The button -->
        <button class="px-7 py-4  bg-[#EFD372] text-[#274C5B] rounded-lg">
            <span class="font-['Roboto'] font-semibold text-[16px]">Read More</span>
            <span class="inline-flex min-w-min min-h-min p-1.5 leading-[200%] bg-[#274C5B] rounded-full text-white text-[10px]"><i class="fa-light fa-arrow-right"></i></span>
        </button>
    </div>`;
    //return the template 
    return newsTemplate;
}

export { newsArr, displayNews};



