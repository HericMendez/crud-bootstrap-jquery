class Note {
  //class é uma palavra reservada em js para class, o tipo da variavel
  constructor(title, description, date, isEdited) {
    //propriedade  - variavel
    this.title = title;
    this.description = description;
    this.date = date;
    this.isEdited = isEdited;
  }
}

//localStorage.setItem("noteList", "")
function addNote(List) {
  const bgColors = ["#E57373",
"#F06292",
"#CE93D8",
"#90CAF9",
"#C5E1A5",
"#FFF59D",
"#FFB74D",
"#BCAAA4",
"#BDBDBD",
];

  console.log(List.length);
  let auxHtml = ""; //variavel pra ajudar a montar a tela

  let randomColor = bgColors[Math.floor(Math.random() * bgColors.length)]

  if (List.length === 0) {
    auxHtml = `
    <div class="d-flex  mt-5" >
    <img src="assets/images/pin.png" width="70" height="70" style="position: fixed; right: 48%; z-index: 10;">

    <div style="
    background-color: ${randomColor};

    box-shadow: 3px 2px 1px rgba(0, 0, 0, 0.6);
    margin: 20px;
    padding: 20px  ;
    margin-left: auto;
    margin-right: auto;
    transform: rotate(${ Math.ceil(Math.random() * 4) * (Math.round(Math.random()) ? 1 : -1)}deg);" class="d-flex flex-column justify-content-center align-items-center">
  
              <h3 class="mt-5 text-center">
              Nenhuma nota por enquanto.<br> Escreva algo!  :)
              </h3>
              <p class="text-center">As notas ficam salvas localmente, na memória do navegador.<br> Tente atualizar a página!</p>
              <button
              id="cust_btn"
              type="button"
              class="btn btn-danger btn  ps-5 pe-5 "
   
              >
              Nova nota
              </button>
              </div></div>`;
  }
  for (let i = 0; i < List.length; i++) {
    auxHtml += `
    <div class="col-lg-6" style="transform: rotate(${Math.ceil(Math.random() * 4) * (Math.round(Math.random()) ? 1 : -1)}deg)">
      <img src="assets/images/pin.png" width="70" height="70" style="position: fixed; margin-left: 260px;">
      <div
      style="
        background-color: ${bgColors[Math.floor(Math.random() * bgColors.length)]};
  
        box-shadow: 3px 2px 1px rgba(0, 0, 0, 0.6);
        margin: 20px;
        padding: 10px 20px;
        min-height: 200px;
      "
    >
      <div class="d-flex justify-content-between">
        <div class="mb-0">
          <h3 class="w-75 d-flex flex-wrap">${List[i].title}</h3>

          <p class="bottom-0">${List[i].date}</p>
        </div>

        <br />
        <div class="d-flex flex-row">
          <a class="editBtn" href="#" rel="${i}"
            ><img src="assets/images/pen.png" width="40" rel="${i}"
          /></a>
          &nbsp;
          <a class="deleteBtn" href="#" rel="${i}"
            ><img src="assets/images/cross.png" width="40" rel="${i}" />
          </a>
        </div>
      </div>
      <div class="border-bottom border-dark"></div>

      <p>${List[i].description}</p>
    </div>
  </div>
</div>

   `;
  }
  return auxHtml;
}
function validar(valor) {
  if (!isNaN(valor) && valor != "") {
    // o usuario tem que inserir um numero para ser verdadeira e ativar a função
    return true;
  } else {
    return false;
  }
}

auxPosicao = "";
noteList = []; // array noteList
// adiciona o produto na classe Note ( codigo, descricao,quantidade, valor)

const storedData = localStorage.getItem("noteList");
if (storedData) noteList = JSON.parse(storedData);

const formatDate = (timestamp) => {
  const dateObject = new Date(timestamp);

  const formattedDate = new Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  }).format(dateObject);

  return formattedDate;
};

console.log(formatDate(Date.now()));
$(document).ready(() => {
  //$chama a jquery e => substitui a function

  $("#tabela").html(addNote(noteList));

  $("#btnSalvar").click(() => {
    let title = $("#title").val(); //substitui document.getelementbyid
    let description = $("#description").val();
    isEdited = false;

    let date = `Criado em ${formatDate(Date.now())}`;
    let newNote = new Note(title, description, date, isEdited);

    if (title && description) {
      if (auxPosicao == "") {
        console.log("criado");
        noteList.push(newNote);
      } else {
        console.log("editado");
        isEdited = true;
        date = `Editado em ${formatDate(Date.now())}`;
        newNote = new Note(title, description, date, isEdited);
        noteList[auxPosicao] = newNote;

        auxPosicao = "";
      }
      console.log(noteList);
      //document.getElementById ('tabela').innerHTML = addNote(noteList);
      $("#tabela").html(addNote(noteList));
      $("input").val(""); //limpa os dados apos inseridos no campo
    } else {
      alert("informe corretamente os dados");
    }
    localStorage.setItem("noteList", JSON.stringify(noteList));
    $("#myModal").modal("toggle");
  });
  $("#tabela").on("click", ".editBtn", (evento) => {
    auxPosicao = evento.target.getAttribute("rel");
    $("#modal-title").text(`Editar "${noteList[auxPosicao].title}"`);
    $("#myModal").modal("toggle");

    $("#title").val(noteList[auxPosicao].title);
    $("#description").val(noteList[auxPosicao].description);

    localStorage.setItem("noteList", JSON.stringify(noteList));
  });
  console.log(JSON.parse(localStorage.getItem("noteList")));
  $("#tabela").on("click", ".deleteBtn", (e) => {
    const index = e.target.getAttribute("rel");
    if (confirm(` ${noteList[index].title} será excluído. Tem certeza? `)) {
      noteList.splice(index, 1);
      $("#tabela").html(addNote(noteList));
      localStorage.setItem("noteList", JSON.stringify(noteList));
    }
  });
  $("#btnJson").on("click", () => {
    const lista = JSON.stringify(noteList);
    alert(lista);
  });
});

$(document).on("click", "#cust_btn", function () {
  $("#modal-title").text(`Escrever nova nota...`);
  $("#myModal").modal("toggle");
});



console.log(ranNum)