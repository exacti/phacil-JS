class ControllerCommonHome extends Controller {
    index() {
        console.log('mama');

        console.log($('body').append('<h1>TESTE</h1>'));

        //console.log(this.registry);

        //console.log(this.registry.get('database').teste());
        console.log(this.database.teste());

        this.data['header'] = "TESTE";

        console.log(this.config.has("URL"));

        this.out();
    }

    uma(){
        console.log("UUUUU");
    }
}