// Create a Page class with a method open(url) that logs "Opening <url>".
// Create a LoginPage class that extends Page and adds a method login() that logs "Logging in...".

class Page {
    open(url) {
        console.log(`Opening ${url}`);
    }   
}

class LoginPage extends Page {
    login() {
        console.log("Logging in...");
    }
}   

