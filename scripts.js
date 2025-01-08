const uploadBtn = document.getElementById('upload-btn');
const inputUpload = document.getElementById('image-upload');

uploadBtn.addEventListener('click', () => {
    inputUpload.click();
})

function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();
        leitor.onload = () => {
            resolve({url: leitor.result, nome: arquivo.name});
        }

        leitor.onerror = () => {
            reject(`Erro ao ler o arquivo: ${arquivo.name}`);
        }
        leitor.readAsDataURL(arquivo);
    })
}


const imagemPrincipal = document.querySelector(".main-imagem");
const nomaDaImagem = document.querySelector(".container-imagem-nome p");

inputUpload.addEventListener('change', async (event) => {
    const arquivo = event.target.files[0];
    
    if(arquivo) {
        try{
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
            imagemPrincipal.src = conteudoDoArquivo.url;
            nomaDaImagem.textContent = conteudoDoArquivo.nome;
        }catch(erro) {
            console.error("Erro na leitura do arquivo");
        }
    }
})