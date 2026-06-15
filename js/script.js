const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let slideAtual = 0;

function mostrarSlide(index) {
  slides.forEach((slide) => {
    slide.classList.remove("ativo");
  });

  slides[index].classList.add("ativo");
}

nextBtn.addEventListener("click", () => {
  slideAtual = slideAtual + 1;

  if (slideAtual >= slides.length) {
    slideAtual = 0;
  }

  mostrarSlide(slideAtual);
});

prevBtn.addEventListener("click", () => {
  slideAtual = slideAtual - 1;

  if (slideAtual < 0) {
    slideAtual = slides.length - 1;
  }

  mostrarSlide(slideAtual);
});

const formulario = document.getElementById("formulario");

if (formulario) {
  formulario.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const mensagem = document.getElementById("mensagem").value;

    const resposta = document.getElementById("resposta-formulario");

    try {

      const requisicao = await fetch(
        "https://tuipi-guarana.onrender.com/api/mensagens",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            nome,
            email,
            mensagem
          })
        }
      );

      const dados = await requisicao.json();

      resposta.textContent = dados.mensagem;

      formulario.reset();

    } catch (erro) {

      resposta.textContent =
        "Erro ao conectar com a API.";

      console.error(erro);

    }
  });
}
