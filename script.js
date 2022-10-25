//  var java_editor = ace.edit("editor");
//  java_editor.setTheme("ace/theme/monokai");
//  java_editor.session.setMode("ace/mode/java");
var editor;
var stdin;
var stdout;
var confirmer;
var xhr;
var prog;
var codeHash;
var url="";
var debugurl="";
var languages;
var themes;

window.onload = function(){
    stdin = ace.edit("stdin");
    stdin.setTheme("ace/theme/monokai");
    stdin.setShowPrintMargin(false);
    stdout = ace.edit("stdout");
    stdout.setTheme("ace/theme/monokai");
    stdout.setShowPrintMargin(false);
    editor = ace.edit("editor");
    editor.setValue("#include <bits/stdc++.h>\n\nusing namespace std;\n\nint main(){\n  \n  \n      return 0;\n}");
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/c_cpp");
    editor.getSession().setUseSoftTabs(false);
    editor.navigateLineEnd();
    editor.setShowPrintMargin(false);
    editor.setOptions({
        fontFamily:'Monaco, Menlo, Ubuntu Mono, Consolas, source-code-pro, monospace',
        fontSize: "20px",
        enableBasicAutoCompletion: false,
        enableSnippets: true,
        enableLiveAutoCompletion:   true
    });

    editor.$blockScrolling = Infinity;
    editor.navigateTo(5,1);
};

var func_run = function(callback) {
    var lang = document.getElementById("language-select").options[document.getElementById("language-select").selectedIndex].innerText;
    run(
        lang,
        editor.getValue(),
        callback
    )
}

/*
document.getElementById("lang").onchange = function(event) {
    var lang = document.getElementById("lang").options[document.getElementById("lang").selectedIndex].innerText;
    console.log("lang");
    editor.getSession().setMode(lang);
    editor.setValue(languages[lang].code);
};
*/
/*
$(document).ready(function() {
    console.log(editor.session.getValue());
    $('#codevalue').val(editor.getSession().getValue());
});
*/

$(".submitButton").each(function(){
    $(this).on("click",function(){
        $("#submitForm").submit()
    });
});

/*
$(function() {$('.langselect').change(function() {
    switch(this.value) {
        case "Java":
            var editor = ace.edit("editor");
            editor.session.setMode("ace/mode/java");
            var code = "Class Main{ public static void main(String[] args) {  }}";
            break;
        case "C":
            var editor  = ace.edit("editor");
            editor.session.setMode("ace/mode/c");
            var code ="#include<stdion.h> int main(){return 0}";
            break;
        case "C++":
            var editor = ace.edit("editor");
            editor.session.setMode("ace/mode/c_cpp");
            var code ="#include<iostream.h> int main(){return 0}";
            editor.session.setMode("ace/mode/c_cpp");
            break;
        case "Python":
            var editor = ace.edit("editor");
            var code ="def main:";
            editor.session.setMode("ace/mode/python");
            break;
        case "Golang":
            var editor = ace.edit("editor");
            editor.session.setMode("ace/mode/golang");
            break;
    }
});});
*/

/*

$(function() {
$(".themeselect").change(function() {
    switch(this.value) {
        case "eclipse":
            var editor = ace.edit("editor");
            editor.setTheme("ace/theme/eclipse");
            break;
        case "github":
            var editor = ace.edit("editor");
            editor.setTheme("ace/theme/github");
            editor.session.setMode("ace/mode/java");
            break;
        case "chrome":
            var editor = ace.edit("editor");
            editor.setTheme("ace/theme/chrome");
            editor.session.setMode("ace/mode/java");
            break;
        case "cloud":
            var editor = ace.edit("editor");
            editor.setTheme("ace/theme/cloud");
            editor.session.setMode("ace/mode/java");
            break;
        case "twilight":
            var editor = ace.edit("editor");
            editor.setTheme("ace/theme/twilight");
            editor.session.setMode("ace/mode/java");
            break;
        case "nord_dark":
            var editor = ace.edit("editor");
            editor.setTheme("ace/theme/nord_dark");
            editor.session.setMode("ace/mode/java");
            break;
        case "monokai":
            var editor = ace.edit("editor");
            editor.setTheme("ace/theme/monokai");
            editor.session.setMode("ace/mode/java");
            break;

    }
})
});
*/

//load  languages map
var xhr = new XMLHttpRequest();
xhr.open("GET", "languages.json",true);
xhr.setRequestHeader("Access-Control-Allow-Origin","*");
xhr.send(null);
xhr.onreadystatechange = function () {
    if(xhr.readyState === 4 && xhr.status === 200){
        languages = JSON.parse(xhr.responseText);
        for( var i in languages) {
            var option = document.createElement("option");
            option.text = i;
            option.value = i;
            document.getElementsByTagName("select")[0].appendChild(option);
            console.log(option);

        }
    }
};

//load themes
var xhr_theme = new XMLHttpRequest();
xhr_theme.open("GET", "idethemes.json",true);
xhr_theme.setRequestHeader("Access-Control-Allow-Origin","*");
xhr_theme.send(null);
xhr_theme.onreadystatechange = function () {
    if(xhr_theme.readyState === 4 && xhr_theme.status === 200){
        themes = JSON.parse(xhr_theme.responseText);
        for( var i in themes) {
            var option = document.createElement("option");
            option.text = i;
            option.value = i;
            document.getElementsByTagName("select")[1].appendChild(option);
            console.log(option);

        }
    }
};
/*
var editor = ace.edit("editor");
editor.setTheme("ace/theme/eclipse");
editor.session.setMode("ace/mode/java");
editor.getSession().on("change",function() {
    console.log(editor.getSession().getValue());
    $('#codevalue').val(editor.getSession().getValue());
});
*/

function run(lang, code, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST",url+"/run",true);
    xhr.onprogress = function() {
        console.log("PROGRESS: ", xhr.responseText);
    };
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xhr.onreadystatechange = function(e) {
        console.log(xhr.readyState);
        xhr=undefined;
    };
    xhr.send(JSON.stringify({language: lang, code: code, stdin: stdin.getValue()}));
}

$(function() {
document.getElementById("language-select").onchange = function(event){
    var inLanguage = document.getElementById("language-select").options[document.getElementById("language-select").selectedIndex].innerText;
    console.log(inLanguage);
    editor.getSession().setMode(languages[inLanguage].mode);
    editor.setValue(languages[inLanguage].code);
}});

$(function() {
    document.getElementById("theme-select").onchange = function(event){
        var theme = document.getElementById("theme-select").options[document.getElementById("theme-select").selectedIndex].innerText;
        console.log(theme);
        editor.setTheme(themes[theme].mode);
    }});

$(function() {
        document.getElementById("run").onclick = function(event){
            func_run(run);
        }});