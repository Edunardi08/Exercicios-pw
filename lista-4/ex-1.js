// Simples feedback para os formulários

function enviarAtividade(){
  const nome = document.getElementById('nomeAtividade').value.trim();
  const radios = document.getElementsByName('atividade');
  let atividade = '';
  for (let r of radios) if (r.checked) atividade = r.value;

  const comentario = document.getElementById('comentarioAtividade').value.trim();
  const feedback = document.getElementById('feedbackAtividade');

  if (!nome || !atividade){
    feedback.textContent = 'Por favor, preencha o nome e escolha uma atividade.';
    return;
  }

  feedback.textContent = `Obrigado, ${nome}! Sua resposta sobre "${atividade}" foi recebida.`;
  // limpa o formulário
  document.getElementById('formAtividade').reset();
}

function enviarSustent(){
  const nome = document.getElementById('nomeSustent').value.trim();
  const checkboxes = document.querySelectorAll('#formSustent input[name="pratica"]:checked');
  const praticas = Array.from(checkboxes).map(cb => cb.value);
  const comentario = document.getElementById('comentarioSustent').value.trim();
  const feedback = document.getElementById('feedbackSustent');

  if (!nome){
    feedback.textContent = 'Por favor, digite seu nome.';
    return;
  }

  if (praticas.length === 0){
    feedback.textContent = 'Escolha pelo menos uma prática sustentável.';
    return;
  }

  feedback.textContent = `Obrigado, ${nome}! Você selecionou: ${praticas.join(', ')}.`;
  document.getElementById('formSustent').reset();
}
