class Phacil {

    constructor(){
        this.error = [];
        this.rota = "";

        this.registry = new Registry();
        console.log(this.error);

        this.linkBehavior();
        
        

    }

    get(key) {
        return this.registry.get(key);
    }

    set(key, value) {
        this.registry.set(key, value);
    }


    linkBehavior() {
        $('a[intern]').click(function (e) {
            e.preventDefault();


        });
    }

    route(rota = 'common/home') {

        let parts = rota.split("/");

        let nameClass;

        this.rota = rota;

        let file = 'controller/'+parts[0]+'/'+parts[1]+'.js';

        $('head').append('<script type="text/javascript" class=".ccc" src="'+ file +'"></script>');

        let folder = parts[0].toLowerCase().replace(/\b[a-z]/g, function(letter) {
            return letter.toUpperCase();
        });

        let archive = parts[1].toLowerCase().replace(/\b[a-z]/g, function(letter) {
            return letter.toUpperCase();
        });

        if(parts.length == 2) {
            nameClass = "Controller"+folder+archive;

            var myObject = eval("new " + nameClass + "()");
            myObject.index();

        } else if(parts.length == 3) {
            nameClass = "Controller"+folder+archive;

            var myObject = eval("new " + nameClass + "()");

            var myClass = eval("myObject." + parts[2] + "()");

            //myClass;
        }

    }

}

class Controller {
    constructor(registry = null){
        this.registry = (registry != null) ? registry : phacil.registry;

        this.data = {};

        Object.assign(this, this.registry.retorno());

        this.replace();
    }

    get(key) {
        return this.registry.get(key);
    }

    set(key, value) {
        this.registry.set(key, value);
    }

    redirect(url) {
        window.location.replace(url);
    }
    
    replace(){
        $('replace').each(function (index, value) {
            console.log(value);
            let elemento = $(value);
            let route = elemento.attr('route');
            elemento.replaceWith('<h4>hdhd</h4>');
        })
    }

    render(){

    }

    loadMustache(templatePath) {
        let template;
        let dados = this.data;

        let templateURL = 'view/default/common/home.mustache';

        let rendered;

        $.ajax({
            url: templateURL,
            method: "get",
            async: false,
            success: function (data) {
                template = data;
                Mustache.parse(template);   // optional, speeds up future uses
                rendered = Mustache.render(template, dados);

            },
            error: function () {
                console.log('Error: impossible to load '+templatePath);
            }
        });

        return (rendered);

    }

    out(){
        this.loadMustache();

        this.replace();
    }

}

class Registry {
    constructor(){
        this.data = [];
    }
    get(key) {
        //console.log(this.data[key]);
        return this.data[key] ;
    }

    set(key, value) {

        this.data[key] = value;
    }

    has(key) {
        return (this.data[key]);
    }

    retorno (){
        return this.data;
    }
}

class DB {
    teste(){
        console.log("cargaDB");
        return true;
    }
}

class config {
    constructor(json = null){

        let jsonData = (json != null) ? json : null;

        if(json == null){
            $.ajax({
                url: 'config.json',
                method: "get",
                async: false,
                dataType: 'json',
                success: function (json) {
                    jsonData = json;

                },
                error: function () {
                    console.log('Error: impossible to load config file');
                }
            });
        }

        console.log(jsonData);

        this.data = jsonData;
    }

    get(key){
        return this.data[key];

    }

    set(key, value) {

        this.data[key] = value;
    }

    has(key) {
        return (this.data[key].length > 0) ? true : false;
    }
}