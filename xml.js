
var xhr = new XMLHttpRequest();


xhr.open("GET", "about.xml", true);


xhr.setRequestHeader("Content-Type", "text/xml");


xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {

        var xml = xhr.responseXML;
        
        var title = xml.querySelector("title").textContent;
        var description = xml.querySelector("description").textContent;
        var support = xml.querySelector("support").textContent;
        var phone = xml.querySelector("phone").textContent;
        
        var footerDiv = document.querySelector(".footer-section[data-section='4']");
        footerDiv.innerHTML = "<h2>" + title + "</h2>" +
                              "<p>" + description + "</p>" +
                              "<p>" + support + "</p>" +
                              "<p>" + phone + "</p>";
    }
};

xhr.send();
