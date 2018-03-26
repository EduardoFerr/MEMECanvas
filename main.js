var Engine = (function (global) {

    let doc = global.document,
        win = global.window,
        a_href = doc.querySelector('a'),
        textoSuperior = doc.getElementById("textoSuperior"),
        textoInferior = doc.getElementById("textoInferior");


    function ouvintiMudancaTexto(evt) {
        evt.target.id == "textoSuperior" ?
            win.textoSuperior = evt.target.value :
            win.textoInferior = evt.target.value;
        pintarMEME(window.imageSrc, window.textoSuperior, window.textoInferior);
    }

    function pintarMEME(foto, textoSuperior, textoInferior) {
        //Get o contexto 2d
        var canvas = doc.querySelector('canvas'),
            ctx = canvas.getContext('2d');

        if (foto != null) {
            ctx.beginPath();
            ctx.drawImage(foto, 0, 0, canvas.width, canvas.height);
        }

        //Atributos dos textos
        ctx.font = '30pt Impact';
        ctx.textAlign = 'center';
        ctx.strokeStyle = 'black';
        //ctx.lineWidth = 3;
        ctx.fillStyle = 'white';


        if (textoSuperior != null) {
            ctx.beginPath();
            ctx.fillText(textoSuperior, canvas.width / 2, canvas.height * 0.1);
            ctx.strokeText(textoSuperior, canvas.width / 2, canvas.height * 0.1);
        }
        if (textoInferior != null) {
            ctx.beginPath();
            ctx.fillText(textoInferior, canvas.width / 2, canvas.height * 0.95);
            ctx.strokeText(textoInferior, canvas.width / 2, canvas.height * 0.95);
        }
    }

    function salvarCanvas() {
        var imagemSalva = doc.querySelector('canvas').toDataURL();
        a_href.href = imagemSalva;
    }

    function tratarSelecaoDeFoto(evt) {
        let canvasWidth = 500,
            canvasHeight = 500;
        var foto = evt.target.files[0];


        var reader = new FileReader();
        reader.onload = function (fileObject) {
            var data = fileObject.target.result,
                imagem = new Image();

            imagem.onload = function () {
                console.log("imagem lida");
                win.imageSrc = this;
                pintarMEME(win.imageSrc, null, null);
            }
            imagem.src = data;
        };
        reader.readAsDataURL(foto);

    }
    
    win.textoSuperior = "";
    win.textoInferior = "";
    textoSuperior.oninput = ouvintiMudancaTexto;
    textoInferior.oninput = ouvintiMudancaTexto;
    foto.addEventListener('change', tratarSelecaoDeFoto, false);
    a_href.addEventListener('click', salvarCanvas, false);

})(this);
