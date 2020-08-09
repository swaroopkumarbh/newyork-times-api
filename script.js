let parentDiv = document.querySelector(".parent-div");
let sectionId = 1;
let id = 1;

function getNews() {
    let sectionName = document.querySelector("select").value;
    getSectionNews(sectionName);
}
async function getSectionNews(sectionName) {
    let url = `https://api.nytimes.com/svc/topstories/v2/${sectionName}.json?api-key=bqMFtAdVhyxanamkNUOkhsvucK3Ok3uq`
    let response = await fetch(url);
    let data = await response.json();
    let sectionDetails = data.results;
    let accordianDiv = document.createElement("div");

    accordianDiv.setAttribute("class", "panel-group");
    accordianDiv.setAttribute("id", "accordion" + sectionId);
    sectionDetails.forEach(value => {
        let main = document.createElement("div");
        main.setAttribute("class", "panel panel-default");
        let pannelheading = document.createElement("div");
        pannelheading.setAttribute("class", "panel-heading");
        let panelTitle = document.createElement("panelTitle");
        panelTitle.setAttribute("class", "panel-title");
        let target = "#" + id;
        let anchorTag = document.createElement("a");
        anchorTag.setAttribute("data-toggle", "collapse");
        anchorTag.setAttribute("data-parent", "#accordion" + sectionId);
        anchorTag.setAttribute("href", target);
        anchorTag.innerHTML = value.item_type+" "+value.byline;
        panelTitle.appendChild(anchorTag);
        pannelheading.appendChild(panelTitle);
        main.appendChild(pannelheading);
        let cardDiv = document.createElement("div");
        cardDiv.setAttribute("id", id);
        cardDiv.setAttribute("class", "panel-collapse collapse");
        let bodyDiv = document.createElement("div");
        bodyDiv.setAttribute("class", "display");

        let row = document.createElement("div");
        row.setAttribute("class", "row");
        let contentDiv = document.createElement("div");
        contentDiv.setAttribute("class", "col-6 content");
        let sectionPara = document.createElement("h4");
        sectionPara.setAttribute("id", "sectionPara");
        sectionPara.innerHTML = data.section;
        contentDiv.appendChild(sectionPara);
        let title = document.createElement("h2");
        title.setAttribute("id", "Title");
        title.innerHTML = value.title;
        contentDiv.appendChild(title);
        let createdDate = document.createElement("p");
        createdDate.setAttribute("id", "createdDate");
        createdDate.innerHTML = value.created_date;
        contentDiv.appendChild(createdDate);
        let abstract = document.createElement("p");
        abstract.setAttribute("id", "abstract");
        abstract.innerHTML = value.abstract;
        contentDiv.appendChild(abstract);
        let shortLink = document.createElement("a");
        shortLink.setAttribute("id", "short-link");
        shortLink.innerHTML = "Continue Reading";
        shortLink.href = value.short_url;
        contentDiv.appendChild(shortLink);
        row.appendChild(contentDiv);
        let rightContent = document.createElement("div");
        rightContent.setAttribute("class", "col-4");
        let imageContainer = document.createElement("div");
        imageContainer.setAttribute("class", "col-6 image");
        let image = document.createElement("img");
        image.setAttribute("class", "image");
        if (value.multimedia != null)
        image.setAttribute("src", value.multimedia[0].url);
        else 
        image.setAttribute("alt", "image");

        imageContainer.appendChild(image);
        rightContent.appendChild(imageContainer);
        bodyDiv.appendChild(contentDiv);
        bodyDiv.appendChild(rightContent);


        id++;
        cardDiv.appendChild(bodyDiv);
        main.appendChild(cardDiv);
        accordianDiv.appendChild(main);
        parentDiv.appendChild(accordianDiv);

    });
    document.body.appendChild(parentDiv);
    sectionId++;
    let panels = document.querySelectorAll(".panel-group");
    for (let i = panels.length - 1; i >= 0; i--) {
        if (i != panels.length - 1)
            panels[i].classList.add("hide");
    }


}