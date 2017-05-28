$(function() {
	/*
	 * ===============================================================================================
	 * Navegação
	 * ===============================================================================================
	 */

	/* Navbars */
	var toogle = false;

	$('#gerarRecomendacao').click(function() {
		localStorage.setItem("click", "gerar");
		window.location.href = "sugestoes.html";
	})

	$('#gerarRecomendacaoTela').click(function() {
		localStorage.setItem("click", "gerar");
		window.location.href = "sugestoes.html";
	})

	$('#minhaGrade').click(function() {

		window.location.href = "matricula.html";
	})

	$('#minhaGradeTela').click(function() {

		window.location.href = "matricula.html";
	})

	$('#verGrade').click(function() {
		window.location.href = "grade.html";
	})

	$('#verGradeTela').click(function() {
		window.location.href = "grade.html";
	})

	$('#recomendacoesAnteriores').click(function() {
		localStorage.setItem("click", "exibe");
		window.location.href = "sugestoes.html";
	})

	$('#recomendacoesAnterioresTela').click(function() {
		localStorage.setItem("click", "exibe");
		window.location.href = "sugestoes.html";
	})

	$('#historico').click(function() {
		window.location.href = "historico.html";
	})

	$('#historicoTela').click(function() {
		window.location.href = "historico.html";
	})

	$('#mensagens').click(function() {
		if (!toogle) {
			$('#chat').css("display", "block");
			toogle = true;
		} else {
			$('#chat').css("display", "none");
			toogle = false;
		}

		return false;
	})

	$('#mensagensMob').click(function() {
		if (!toogle) {
			$('#chat').css("display", "block");
			toogle = true;
		} else {
			$('#chat').css("display", "none");
			toogle = false;
		}

		return false;
	})

	$('#mensagensIcone').click(function() {
		if (!toogle) {
			$('#chat').css("display", "block");
			toogle = true;
		} else {
			$('#chat').css("display", "none");
			toogle = false;
		}

		return false;
	})

	$('#mudarInfos').click(function() {
		window.location.href = "alterar.html";
	})

	$('#faleConosco').click(function() {
		window.location.href = "contato.html";
	})

	$('#perguntasFrequentes').click(function() {
		window.location.href = "faq.html";
	})

	$('#faq').click(function() {
		window.location.href = "faq.html";
	})

	$('#sobre').click(function() {
		window.location.href = "sobre.html";
	})

	$('#login').click(function() {
		window.location.href = "login.html";
	})

	$('#loginM').click(function() {
		window.location.href = "login.html";
	})

	$('.logo-container').click(function() {
		window.location.href = "aluno.html";
	})

	$('#logo-containerM').click(function() {
		window.location.href = "index.html";
	})

	$('.default-nav').click(function() {
		$('#chat').css("display", "none");
		toogle = false;
		return false;
	})

	/*
	 * ===============================================================================================
	 * Admin
	 * ===============================================================================================
	 */
	if ($('body').is('.admin')) {
		$(document)
				.on(
						'click',
						'.alunoAdmin',
						function() {
							var alunoID = $(this).attr('id');
							$
									.ajax({
										url : 'http://localhost:8080/alunos/'
												+ alunoID,
										headers : {
											'Content-Type' : 'application/x-www-form-urlencoded'
										},
										type : "GET",
										contentType : "application/json; charset=utf-8",
										dataType : 'json',
										async : true,
										success : function(data) {
											var bArea = '';

											switch (data.areaDePreferencia) {
											case "FC":
												bArea = "Fundamentos da Computação";
												break;
											case "ARQ":
												bArea = "Arquitetura de Redes e Computadores";
												break;
											case "Ensiso":
												bArea = "Ensino de Sistemas de Software";
												break;
											}

											var listaAprovadas = [];
											var listaReprovadas = [];
											var listaAcompanhadas = [];

											listaAprovadas = data.disciplinasPagas;
											listaReprovadas = data.disciplinasReprovadas;
											listaAcompanhadas = data.disciplinasAcompanhadas;
											$('#dAprovadas').text(
													listaAprovadas.length);
											$('#dReprovadas').text(
													listaReprovadas.length);
											$('#dAcompanhadas').text(
													listaAcompanhadas.length);
											$('#dRestantes').text(
													65 - listaAprovadas.length);

											$('#nomeDetalhe').text(data.nome);
											$('#emailDetalhe').text(data.email);

											var cpf = '<p id="cpf" class="light" style="font-style: italic;">CPF: '
													+ data.cpf + '</p>';
											var anoIngresso = '<p id="anoIngresso" class="light" style="font-style: italic;">Ano de Ingresso: '
													+ data.anoIngresso
													+ '.'
													+ data.semestreIngresso
													+ '</p>';
											var horasLivres = '<p id="horasLivres" class="light" style="font-style: italic;">Horas Livres Semanais: '
													+ data.tempoEstudoExtraClasse
													+ '</p>';
											var trancados = '<p id="trancado" class="light" style="font-style: italic;">Quantidade de Períodos Trancados: '
													+ data.qtdPeriodosTrancados
													+ '</p>';
											var area = '<p id="areaPreferencia" class="light" style="font-style: italic;">Área de Preferência: '
													+ bArea + '</p>';
											$('#infosAluno').append(cpf);
											$('#infosAluno')
													.append(anoIngresso);
											$('#infosAluno')
													.append(horasLivres);
											$('#infosAluno').append(trancados);
											$('#infosAluno').append(area);

											$
													.ajax({
														url : 'http://localhost:8080/sugestao/'
																+ alunoID,
														headers : {
															'Content-Type' : 'application/x-www-form-urlencoded'
														},
														type : "GET",
														contentType : "application/json; charset=utf-8",
														dataType : 'json',
														async : true,
														success : function(data) {
															var layoutSugestao = '';
															var layoutPeriodoExterno = '';
															var layoutDisciplina = '';
															var layoutPeriodoInterno = '';

															var i = 1;

															$
																	.each(
																			data,
																			function(
																					sugestaoID,
																					sugestao) {
																				var num = "";

																				switch (i) {
																				case 1:
																					num = "Primeira";
																					break;
																				case 2:
																					num = "Segunda";
																					break;
																				case 3:
																					num = "Terceira";
																					break;
																				default:
																					num = "";
																				}

																				layoutSugestao = "<div class=\"row\"><div class=\"col s12\"><div class=\"container portfolio center\"><h4 id=\"num-sugestao\">"
																						+ num
																						+ " Sugestão de Matrícula</h4><h6 id=\"infos-sugestao\">Tempo (em períodos) restante para conclusão: "
																						+ sugestao.tempoFormatura
																						+ ";<br>Quantidade de disciplinas fora da sua área de preferência: "
																						+ sugestao.qtdDisciplinasForaArea
																						+ ";</h6><hr></div></div>";
																				layoutPeriodoExterno = "<div id=\"periodos\" class=\"row s12 m1 l1 center\">";

																				$
																						.each(
																								sugestao.periodos,
																								function(
																										periodosID,
																										periodos) {
																									layoutPeriodoInterno = "<div class=\"row s12 m3 l3 text-center\" style=\"display: inline-block; vertical-align: top;\"><div class=\"col s12 m12 l12 portfolio-holder\">";
																									// console.log(layoutPeriodoInterno);
																									$
																											.each(
																													periodos.disciplinasDoPeriodoDaSugestao,
																													function(
																															disciplinasDoPeriodoDaSugestaoID,
																															disciplinasDoPeriodoDaSugestao) {
																														layoutDisciplina = '<div class=\'disciplina materialboxed white-text center-align '
																																+ disciplinasDoPeriodoDaSugestao.area
																																+ '\'>'
																																+ disciplinasDoPeriodoDaSugestao.nome
																																+ '</div>';
																														// console.log(layoutDisciplina);
																														layoutPeriodoInterno = layoutPeriodoInterno
																																+ layoutDisciplina;
																													});
																									layoutPeriodoInterno = layoutPeriodoInterno
																											+ "</div></div>";
																									// console.log(layoutSugestao);
																									layoutPeriodoExterno = layoutPeriodoExterno
																											+ layoutPeriodoInterno;
																								});
																				layoutPeriodoExterno = layoutPeriodoExterno
																						+ "</div>";
																				layoutSugestao = layoutSugestao
																						+ layoutPeriodoExterno;
																				layoutSugestao = layoutSugestao
																						+ "</div>";
																				// console.log(layoutSugestao);
																				$(
																						'#sugestoes')
																						.append(
																								layoutSugestao);
																				i++;
																			});
														},
														error : function() {
															console
																	.log("error");
														}
													});

										}
									})
						})

		$
				.ajax({
					url : 'http://localhost:8080/alunos',
					headers : {
						'Content-Type' : 'application/x-www-form-urlencoded'
					},
					type : "GET",
					contentType : "application/json; charset=utf-8",
					dataType : 'json',
					async : true,
					success : function(data) {
						var i = 0;
						$(data)
								.each(
										function() {
											if (this.disciplinasAcompanhadas.length === 0) {
												var layout = '<a id="'
														+ this.id
														+ '" href="#alunoDetalhe" class="collection-item green-text alunoAdmin">'
														+ this.nome + '</a>'
												$('#listaDeAlunos').append(
														layout);
											}
											if (this.disciplinasAcompanhadas.length !== 0) {
												var layout = '<a id="'
														+ this.id
														+ '" href="#alunoDetalhe" class="collection-item orange-text alunoAdmin">'
														+ this.nome + '</a>'
												$('#listaDeAlunos').append(
														layout);
												i++
											}

										})
						$('#alunoTotal').text(data.length);
						$('#alunoAcompanhado').text(i);
					}
				})

	}
	/*
	 * ===============================================================================================
	 * Alterar Dados
	 * ===============================================================================================
	 */

	/*
	 * ===============================================================================================
	 * Aluno
	 * ===============================================================================================
	 */

	/* GET Recuperar o nome do aluno */
	if ($('body').is('.aluno')) {
		$.ajax({
			url : 'http://localhost:8080/alunos/'+ localStorage.getItem("click"),
			headers : {
				'Content-Type' : 'application/x-www-form-urlencoded'
			},
			type : "GET",
			contentType : "application/json; charset=utf-8",
			dataType : 'json',
			async : true,
			success : function(data) {
				$('#nomeUsuario').text("Olá, " + data.nome);
			}
		})
	}

	/*
	 * ===============================================================================================
	 * Cadastro
	 * ===============================================================================================
	 */

	/*
	 * Recuperar lista de disciplinas do banco e exibir no accordion collapsible
	 * do cadastro
	 */

	if ($('body').is('.cadastro')) {
		$
				.ajax({
					url : 'http://localhost:8080/disciplinas',
					headers : {
						'Content-Type' : 'application/x-www-form-urlencoded'
					},
					type : "GET",
					contentType : "application/json; charset=utf-8",
					dataType : 'json',
					async : true,
					success : function(listaDisciplinas) {
						$(listaDisciplinas)
								.each(
										function() {
											var layout = '';
											var bArea = '';
											var dias = [];

											switch (this.area) {
											case "FC":
												bArea = "Fundamentos da Computação";
												break;
											case "ARQ":
												bArea = "Arquitetura de Redes e Computadores";
												break;
											case "Ensiso":
												bArea = "Ensino de Sistemas de Software"
											}

											if (this.periodo != 0) {
												layout = '<li><div class="collapsible-header"><span class="new badge" data-badge-caption="'
														+ this.periodo
														+ 'º Período"></span><span class=""><div class="chip '
														+ this.area
														+ ' white-text">'
														+ this.codigo
														+ '</div>'
														+ this.nome
														+ '</span></div><div class="collapsible-body"><div class="section"></div><div class="row s12 m9"><div class="col s12 m7"><span class="new badge blue-grey darken-3" data-badge-caption="'
														+ bArea
														+ '"></span></div></div><div class="divider" style="margin-left: 20px; margin-right: 20px;"></div><div class="section"></div><div class="row s12 m12 center"><div class="col s12 m4"><input class="with-gap" name="groupAprovado'
														+ this.id
														+ '" type="radio" id="rb_aprovado'
														+ this.id
														+ '"/> <label for="rb_aprovado'
														+ this.id
														+ '">Aprovado</label></div><div class="col s12 m4"><input class="with-gap reprovado" name="groupAprovado'
														+ this.id
														+ '" type="radio" id="rb_reprovado'
														+ this.id
														+ '" /><label for="rb_reprovado'
														+ this.id
														+ '">Reprovado</label></div><div class="col s12 m4"><input class="acompanhado" type="checkbox" id="acompanhado'
														+ this.id
														+ '" disabled="disabled"/><label for="acompanhado'
														+ this.id
														+ '">Estou acompanhado</label></div></div><script type="text/javascript">$("#rb_aprovado'
														+ this.id
														+ '").click(function() {$("#acompanhado'
														+ this.id
														+ '").attr("disabled", true);});$("#rb_reprovado'
														+ this.id
														+ '").click(function() {$("#acompanhado'
														+ this.id
														+ '").attr("disabled", false);});</script></div></li>';
												$('#obrigatorias').append(
														layout);
											}
											if (this.periodo == 0) {
												layout = '<li><div class="collapsible-header"><span class="new badge" data-badge-caption="Sem Periodização"></span><span class=""><div class="chip '
														+ this.area
														+ ' white-text">'
														+ this.codigo
														+ '</div>'
														+ this.nome
														+ '</span></div><div class="collapsible-body"><div class="section"></div><div class="row s12 m9"><div class="col s12 m7"><span class="new badge blue-grey darken-3" data-badge-caption="'
														+ bArea
														+ '"></span></div></div><div class="divider" style="margin-left: 20px; margin-right: 20px;"></div><div class="section"></div><div class="row s12 m12 center"><div class="col s12 m4"><input class="with-gap" name="groupAprovado'
														+ this.id
														+ '" type="radio" id="rb_aprovado'
														+ this.id
														+ '"/> <label for="rb_aprovado'
														+ this.id
														+ '">Aprovado</label></div><div class="col s12 m4"><input class="with-gap reprovado" name="groupAprovado'
														+ this.id
														+ '" type="radio" id="rb_reprovado'
														+ this.id
														+ '" /><label for="rb_reprovado'
														+ this.id
														+ '">Reprovado</label></div><div class="col s12 m4"><input class="acompanhado" type="checkbox" id="acompanhado'
														+ this.id
														+ '" disabled="disabled"/><label for="acompanhado'
														+ this.id
														+ '">Estou acompanhado</label></div></div><script type="text/javascript">$("#rb_aprovado'
														+ this.id
														+ '").click(function() {$("#acompanhado'
														+ this.id
														+ '").attr("disabled", true);});$("#rb_reprovado'
														+ this.id
														+ '").click(function() {$("#acompanhado'
														+ this.id
														+ '").attr("disabled", false);});</script></div></li>';
												$('#optativas').append(layout);
											}
										});
					}
				})

		/* Enviar Formulário de Cadastro */

		$('button[type="submit"]').click(function(event) {
			var listaPagas = JSON.parse(JSON.stringify([{id:1},{id:2}]));
			var listaReprovadas = JSON.parse(JSON.stringify([{id:3},{id:4}]));
			var listaAcompanhadas = JSON.parse(JSON.stringify([{id:3},{id:4}]));
			
			var periodoIngresso = $('#anoIngresso').val().split(".");
			

			// var formularioCadastro = new Object();
			// formularioCadastro.nome = $('#first_name').val() + " " +
			// $('#last_name').val();
			// console.log(formularioCadastro.nome);
			// formularioCadastro.cpf = $('#cpf').val();
			// console.log(formularioCadastro.cpf);
			// formularioCadastro.email = $('#email').val();
			// console.log(formularioCadastro.email);
			// formularioCadastro.senha = $('#password').val();
			// console.log(formularioCadastro.senha);
			// formularioCadastro.anoIngresso = periodoIngresso[0];
			// console.log(formularioCadastro.anoIngresso);
			// formularioCadastro.semestreIngresso = periodoIngresso[1];
			// console.log(formularioCadastro.semestreIngresso);
			// formularioCadastro.tempoEstudoExtraClasse =
			// $('#horasDisponiveis').val();
			// console.log(formularioCadastro.tempoEstudoExtraClasse);
			// formularioCadastro.qtdPeriodosTrancados =
			// $('#periodosTrancados').val();
			// console.log(formularioCadastro.qtdPeriodosTrancados);
			// formularioCadastro.areaDePreferencia =
			// $('#areaPreferencia').val();
			// console.log(formularioCadastro.areaDePreferencia);
			// formularioCadastro.disciplinasPagas = listaPagas;
			// formularioCadastro.disciplinasReprovadas = listaReprovadas;
			// formularioCadastro.disciplinasAcompanhadas = listaAcompanhadas;
			// //
			var formularioCadastro = {
				nome : $('#first_name').val() + " " + $('#last_name').val(),
				cpf : $('#cpf').val(),
				email : $('#email').val(),
				senha : $('#password').val(),
				anoIngresso : periodoIngresso[0],
				semestreIngresso : periodoIngresso[1],
				tempoEstudoExtraClasse : $('#horasDisponiveis').val(),
				qtdPeriodosTrancados : $('#periodosTrancados').val(),
				areaDePreferencia : $('#areaPreferencia').val(),
				disciplinasPagas :listaPagas,
				disciplinasReprovadas : listaReprovadas,
				disciplinasAcompanhadas : listaAcompanhadas
			};
			
			console.log(formularioCadastro);

			// var formularioCadastro = "{\"nome\":"+$('#first_name').val() + "
			// " + $('#last_name').val()+", \"cpf\":"+$('#cpf').val()+",
			// \"email\":"+$('#email').val()+",
			// \"senha\":"+$('#password').val()+", \"" +
			// "anoIngresso\":"+periodoIngresso[0]+",
			// \"semestreIngresso\":"+periodoIngresso[1]+",
			// \"tempoEstudoExtraClasse\":"+$('#horasDisponiveis').val()+",
			// \"qtdPeriodosTrancados\":"+$('#periodosTrancados').val()+", " +
			// "\"areaDePreferencia\":"+$('#areaPreferencia').val()+",
			// \"disciplinasPagas\":"+[]+", \"disciplinasReprovadas\":"+[]+",
			// \"disciplinasAcompanhadas\":"+[]+", }"
			// formularioCadastro=JSON.parse(formularioCadastro);
			// console.log(data);
			// var xhr = new XMLHttpRequest();
			// xhr.open("POST", "http://localhost:8080/alunos", true);
			// xhr.setRequestHeader('Content-Type', 'application/json;
			// charset=UTF-8');
			//
			// // send the collected data as JSON
			// xhr.send(JSON.stringify(data));
			//
			// xhr.onloadend = function () {
			// console.log("dados", data);
			// }
			// $.post('http://localhost:8080/alunos', data, function(response) {
			// console.log("conseguiu!");
			// }, 'json');
			/* Stringifica o JSON para envio e faz POST */
			// $.postJSON = function(url, data) {
			// args = $.extend({
			// url: "localhost:8080/alunos",
			// type: 'POST',
			// data: data,
			// contentType: 'application/json; charset=utf-8',
			// dataType: 'json',
			// async: true,
			// success: function(){
			// console.log("foii");
			// }
			// })
			// }
			$.ajax({
				url : 'http://localhost:8080/alunos',
				headers : {
					'Content-Type' : 'application/json'
				},
				type : "POST",
				dataType : 'json',
				data : JSON.stringify(formularioCadastro),
				async : true,
				success : function(data) {
					console.log(data);
				},
				error : function(data) {
					console.log("error", data);
				}
			});
			event.preventDefault();
		})

	}

	/*
	 * ===============================================================================================
	 * Grade
	 * ===============================================================================================
	 */

	if ($('body').is('.grade')) {

		/* Recupera a grade de disciplinas */

		$
				.ajax({
					url : 'http://localhost:8080/gradeHorario',
					headers : {
						'Content-Type' : 'application/x-www-form-urlencoded'
					},
					type : "GET",
					contentType : "application/json; charset=utf-8",
					dataType : 'json',
					async : true,
					success : function(data) {
						$(data)
								.each(
										function() {
											var layout = '<div class=\'disciplina materialboxed white-text center-align '
													+ this.area
													+ '\'>'
													+ this.nome + '</div>';

											$('#periodo' + this.periodo)
													.append(layout);
										});
					},
					error : function() {
						console.log("error");
					}
				})

		/* Recupera Lista de Disciplinas */

		$
				.ajax({
					url : 'http://localhost:8080/disciplinas',
					headers : {
						'Content-Type' : 'application/x-www-form-urlencoded'
					},
					type : "GET",
					contentType : "application/json; charset=utf-8",
					dataType : 'json',
					async : true,
					success : function(listaDisciplinas) {

						$(listaDisciplinas)
								.each(
										function() {
											// console.log(this.area);
											var layout = '';
											var bArea = '';
											var dias = [];

											switch (this.area) {
											case "FC":
												bArea = "Fundamentos da Computação";
												break;
											case "ARQ":
												bArea = "Arquitetura de Redes e Computadores";
												break;
											case "Ensiso":
												bArea = "Ensino de Sistemas de Software"
											}

											if (this.segunda != '') {
												dias.push("Segundas às "
														+ this.segunda);
											}

											if (this.terca != '') {
												dias.push("Terças às "
														+ this.terca);
											}

											if (this.quarta != '') {
												dias.push("Quartas às "
														+ this.quarta);
											}

											if (this.quinta != '') {
												dias.push("Quintas às "
														+ this.quinta);
											}

											if (this.sexta != '') {
												dias.push("Sextas às "
														+ this.sexta);
											}

											if (this.periodo != 0) {
												layout = '<li><div class="collapsible-header"><span class="new badge" data-badge-caption="'
														+ this.periodo
														+ 'º Período"></span><span class=""><div class="chip '
														+ this.area
														+ ' white-text">'
														+ this.codigo
														+ '</div>'
														+ this.nome
														+ '</span></div><div class="collapsible-body"><div class="section"></div><div class="row s10 m9"><div class="col s9 m4"><span class="new badge blue-grey darken-3" data-badge-caption="'
														+ bArea
														+ '"></span></div><div class="col s9 m3"><span class="new badge blue-grey darken-3" data-badge-caption="'
														+ dias[0]
														+ '"></span></div><div class="col s9 m3"><span class="new badge blue-grey darken-3" data-badge-caption="'
														+ dias[1]
														+ '"></span></div></div></li>';
												$('#obrigatorias').append(
														layout);
											}
											if (this.periodo == 0) {
												layout = '<li><div class="collapsible-header"><span class="new badge" data-badge-caption="Sem Periodização"></span><span class=""><div class="chip '
														+ this.area
														+ ' white-text">'
														+ this.codigo
														+ '</div>'
														+ this.nome
														+ '</span></div><div class="collapsible-body"><div class="section"></div><div class="row s10 m9"><div class="col s9 m4"><span class="new badge blue-grey darken-3" data-badge-caption="'
														+ bArea
														+ '"></span></div><div class="col s9 m3"><span class="new badge blue-grey darken-3" data-badge-caption="'
														+ dias[0]
														+ '"></span></div><div class="col s9 m3"><span class="new badge blue-grey darken-3" data-badge-caption="'
														+ dias[1]
														+ '"></span></div></div></li>';
												$('#optativas').append(layout);
											}
										});
					},
					error : function() {
						console.log("error lista");
					}
				})
	}

	/*
	 * ===============================================================================================
	 * Historico
	 * ===============================================================================================
	 */
	if ($('body').is('.historico')) {
		function recuperarListaTotal() {
			$
					.ajax({
						url : 'http://localhost:8080/disciplinas',
						headers : {
							'Content-Type' : 'application/x-www-form-urlencoded'
						},
						type : "GET",
						contentType : "application/json; charset=utf-8",
						dataType : 'json',
						async : true,
						success : function(listaDisciplinas) {
							$(listaDisciplinas)
									.each(
											function() {
												var layout = '';
												var bArea = '';
												var dias = [];

												switch (this.area) {
												case "FC":
													bArea = "Fundamentos da Computação";
													break;
												case "ARQ":
													bArea = "Arquitetura de Redes e Computadores";
													break;
												case "Ensiso":
													bArea = "Ensino de Sistemas de Software"
												}

												if (this.periodo != 0) {
													layout = '<li><div class="collapsible-header"><span class="new badge" data-badge-caption="'
															+ this.periodo
															+ 'º Período"></span><span class=""><div class="chip '
															+ this.area
															+ ' white-text">'
															+ this.codigo
															+ '</div>'
															+ this.nome
															+ '</span></div><div class="collapsible-body"><div class="section"></div><div class="row s12 m9"><div class="col s12 m7"><span class="new badge blue-grey darken-3" data-badge-caption="'
															+ bArea
															+ '"></span></div></div><div class="divider" style="margin-left: 20px; margin-right: 20px;"></div><div class="section"></div><div class="row s12 m12 center"><div class="col s12 m4"><input class="with-gap" name="groupAprovado'
															+ this.id
															+ '" type="radio" id="rb_aprovado'
															+ this.id
															+ '"/> <label for="rb_aprovado'
															+ this.id
															+ '">Aprovado</label></div><div class="col s12 m4"><input class="with-gap reprovado" name="groupAprovado'
															+ this.id
															+ '" type="radio" id="rb_reprovado'
															+ this.id
															+ '" /><label for="rb_reprovado'
															+ this.id
															+ '">Reprovado</label></div><div class="col s12 m4"><input class="acompanhado" type="checkbox" id="acompanhado'
															+ this.id
															+ '" disabled="disabled"/><label for="acompanhado'
															+ this.id
															+ '">Estou acompanhado</label></div></div><script type="text/javascript">$("#rb_aprovado'
															+ this.id
															+ '").click(function() {$("#acompanhado'
															+ this.id
															+ '").attr("disabled", true);});$("#rb_reprovado'
															+ this.id
															+ '").click(function() {$("#acompanhado'
															+ this.id
															+ '").attr("disabled", false);});</script></div></li>';
													$('#obrigatorias').append(
															layout);
												}
												if (this.periodo == 0) {
													layout = '<li><div class="collapsible-header"><span class="new badge" data-badge-caption="Sem Periodização"></span><span class=""><div class="chip '
															+ this.area
															+ ' white-text">'
															+ this.codigo
															+ '</div>'
															+ this.nome
															+ '</span></div><div class="collapsible-body"><div class="section"></div><div class="row s12 m9"><div class="col s12 m7"><span class="new badge blue-grey darken-3" data-badge-caption="'
															+ bArea
															+ '"></span></div></div><div class="divider" style="margin-left: 20px; margin-right: 20px;"></div><div class="section"></div><div class="row s12 m12 center"><div class="col s12 m4"><input class="with-gap" name="groupAprovado'
															+ this.id
															+ '" type="radio" id="rb_aprovado'
															+ this.id
															+ '"/> <label for="rb_aprovado'
															+ this.id
															+ '">Aprovado</label></div><div class="col s12 m4"><input class="with-gap reprovado" name="groupAprovado'
															+ this.id
															+ '" type="radio" id="rb_reprovado'
															+ this.id
															+ '" /><label for="rb_reprovado'
															+ this.id
															+ '">Reprovado</label></div><div class="col s12 m4"><input class="acompanhado" type="checkbox" id="acompanhado'
															+ this.id
															+ '" disabled="disabled"/><label for="acompanhado'
															+ this.id
															+ '">Estou acompanhado</label></div></div><script type="text/javascript">$("#rb_aprovado'
															+ this.id
															+ '").click(function() {$("#acompanhado'
															+ this.id
															+ '").attr("disabled", true);});$("#rb_reprovado'
															+ this.id
															+ '").click(function() {$("#acompanhado'
															+ this.id
															+ '").attr("disabled", false);});</script></div></li>';
													$('#optativas').append(
															layout);
												}
											});
						}
					})
		}
		function recuperarListaDisicplinaAluno() {
			$.ajax({
				url : 'http://localhost:8080/alunos/1',
				headers : {
					'Content-Type' : 'application/x-www-form-urlencoded'
				},
				type : "GET",
				contentType : "application/json; charset=utf-8",
				dataType : 'json',
				async : true,
				success : function(data) {

					var listaAprovadas = [];
					var listaReprovadas = [];
					var listaAcompanhadas = [];

					listaAprovadas = data.disciplinasPagas;
					listaReprovadas = data.disciplinasReprovadas;
					listaAcompanhadas = data.disciplinasAcompanhadas;
					$('#dAprovadas').text(listaAprovadas.length);
					$('#dReprovadas').text(listaReprovadas.length);
					$('#dAcompanhadas').text(listaAcompanhadas.length);
					$('#dRestantes').text(65 - listaAprovadas.length);

				},
				error : function() {
					console.log("error");
				}
			})
		}
		recuperarListaTotal();
		recuperarListaDisicplinaAluno();

	}

	/*
	 * ===============================================================================================
	 * Login
	 * ===============================================================================================
	 */

	$('#btnEntrarLogin').click(function(event) {
		var cEmail = $('#email').val();
		var cSenha = $('#password').val();
		// var dados = {"nome":""+email, "senha":""+senha}
		// console.log(dados);
		// $.post( "http://localhost:8080/efetuaLogin", {email:cEmail,
		// senha:cSenha})
		// console.log("enviou")
		// .done(function( data ) {
		// alert( "Data Loaded: " + data );
		// });
		var dados = {
			email : $('#email').val(),
			senha : $('#password').val()
		};
		console.log(dados);
		$.ajax({
			type : 'POST',
			url : "http://localhost:8080/efetuaLogin",
			data : JSON.stringify(dados),
			headers : {
				'Content-Type' : 'application/json'
			},
			contentType : "application/json",
			dataType : "json",
			async : true,
			success : function(data) {
				console.log(data);
				localStorage.setItem("logadoID", data.id);
				alert(data);
				if (data.coordenador) {
					window.location.href = "admin.html"; // usar essa forma
															// de
															// redirecionamento
															// para todos os
															// botões
					// para redirecionar e evitar um loop de submissão de form
					// http
				}
				if (!data.coordenador) {
					window.location.href = "aluno.html"; // usar essa forma
															// de
															// redirecionamento
															// para todos os
															// botões
					// para redirecionar e evitar um loop de submissão de form
					// http
				}
			},
			error : function(result) {
				console.log("error", result);
			}
		});
		event.preventDefault();

	})
	/*
	 * ===============================================================================================
	 * Sugestões
	 * ===============================================================================================
	 */
	if ($('body').is('.sugestao')) {

		var click = localStorage.getItem("click");
		console.log(click);
		if (click == "exibe") {
			/* remove o preloader */
			$('#sugestoes').empty();
			/* pede as sugestões geradas */

			$
					.ajax({
						url : 'http://localhost:8080/sugestao/6',
						headers : {
							'Content-Type' : 'application/x-www-form-urlencoded'
						},
						type : "GET",
						contentType : "application/json; charset=utf-8",
						dataType : 'json',
						async : true,
						success : function(data) {
							if (data != []) {

								console.log(data);
								var layoutSugestao = '';
								var layoutPeriodoExterno = '';
								var layoutDisciplina = '';
								var layoutPeriodoInterno = '';

								var i = 1;

								$
										.each(
												data,
												function(sugestaoID, sugestao) {
													var num = "";

													switch (i) {
													case 1:
														num = "Primeira";
														break;
													case 2:
														num = "Segunda";
														break;
													case 3:
														num = "Terceira";
														break;
													default:
														num = "";
													}

													layoutSugestao = "<div class=\"row\"><div class=\"col s12\"><div class=\"container portfolio center\"><h4 id=\"num-sugestao\">"
															+ num
															+ " Sugestão de Matrícula</h4><h6 id=\"infos-sugestao\">Tempo (em períodos) restante para conclusão: "
															+ sugestao.tempoFormatura
															+ ";<br>Quantidade de disciplinas fora da sua área de preferência: "
															+ sugestao.qtdDisciplinasForaArea
															+ ";</h6><hr></div></div>";
													layoutPeriodoExterno = "<div id=\"periodos\" class=\"row s12 m1 l1 center\">";

													$
															.each(
																	sugestao.periodos,
																	function(
																			periodosID,
																			periodos) {
																		layoutPeriodoInterno = "<div class=\"row s12 m3 l3 text-center\" style=\"display: inline-block; vertical-align: top;\"><div class=\"col s12 m12 l12 portfolio-holder\">";
																		// console.log(layoutPeriodoInterno);
																		$
																				.each(
																						periodos.disciplinasDoPeriodoDaSugestao,
																						function(
																								disciplinasDoPeriodoDaSugestaoID,
																								disciplinasDoPeriodoDaSugestao) {
																							layoutDisciplina = '<div class=\'disciplina materialboxed white-text center-align '
																									+ disciplinasDoPeriodoDaSugestao.area
																									+ '\'>'
																									+ disciplinasDoPeriodoDaSugestao.nome
																									+ '</div>';
																							// console.log(layoutDisciplina);
																							layoutPeriodoInterno = layoutPeriodoInterno
																									+ layoutDisciplina;
																						});
																		layoutPeriodoInterno = layoutPeriodoInterno
																				+ "</div></div>";
																		// console.log(layoutSugestao);
																		layoutPeriodoExterno = layoutPeriodoExterno
																				+ layoutPeriodoInterno;
																	});
													layoutPeriodoExterno = layoutPeriodoExterno
															+ "</div>";
													layoutSugestao = layoutSugestao
															+ layoutPeriodoExterno;
													layoutSugestao = layoutSugestao
															+ "</div>";
													// console.log(layoutSugestao);
													$('#sugestoes').append(
															layoutSugestao);
													i++;
												});
							}
							$('#sugestoes')
									.append(
											'<div class="valign-demo valign-wrapper" style="margin-top: 150px;"> <h6 class="valign center flow-text" style="width: 100%; height: 200px; margin-top: 160px;">Parece que você não possui sugestões! Gostaria de gerar agora?</h6> </div>');
						},
						error : function() {
							console.log("error");
						}
					});
		}

		if (click == "gerar") {
			$
					.ajax({
						url : 'http://localhost:8080/sugestao/1',
						headers : {
							'Content-Type' : 'application/x-www-form-urlencoded'
						},
						type : "POST",
						contentType : "application/json; charset=utf-8",
						dataType : 'json',
						async : true,
						success : function(data) {
							$('#sugestoes').empty();
							var layoutSugestao = '';
							var layoutPeriodoExterno = '';
							var layoutDisciplina = '';
							var layoutPeriodoInterno = '';

							var i = 1;

							$
									.each(
											data,
											function(sugestaoID, sugestao) {
												var num = "";

												switch (i) {
												case 1:
													num = "Primeira";
													break;
												case 2:
													num = "Segunda";
													break;
												case 3:
													num = "Terceira";
													break;
												default:
													num = "";
												}

												layoutSugestao = "<div class=\"row\"><div class=\"col s12\"><div class=\"container portfolio center\"><h4 id=\"num-sugestao\">"
														+ num
														+ " Sugestão de Matrícula</h4><h6 id=\"infos-sugestao\">Tempo (em períodos) restante para conclusão: "
														+ sugestao.tempoFormatura
														+ ";<br>Quantidade de disciplinas fora da sua área de preferência: "
														+ sugestao.qtdDisciplinasForaArea
														+ ";</h6><hr></div></div>";
												layoutPeriodoExterno = "<div id=\"periodos\" class=\"row s12 m1 l1 center\">";

												$
														.each(
																sugestao.periodos,
																function(
																		periodosID,
																		periodos) {
																	layoutPeriodoInterno = "<div class=\"row s12 m3 l3 text-center\" style=\"display: inline-block; vertical-align: top;\"><div class=\"col s12 m12 l12 portfolio-holder\">";
																	// console.log(layoutPeriodoInterno);
																	$
																			.each(
																					periodos.disciplinasDoPeriodoDaSugestao,
																					function(
																							disciplinasDoPeriodoDaSugestaoID,
																							disciplinasDoPeriodoDaSugestao) {
																						layoutDisciplina = '<div class=\'disciplina materialboxed white-text center-align '
																								+ disciplinasDoPeriodoDaSugestao.area
																								+ '\'>'
																								+ disciplinasDoPeriodoDaSugestao.nome
																								+ '</div>';
																						// console.log(layoutDisciplina);
																						layoutPeriodoInterno = layoutPeriodoInterno
																								+ layoutDisciplina;
																					});
																	layoutPeriodoInterno = layoutPeriodoInterno
																			+ "</div></div>";
																	// console.log(layoutSugestao);
																	layoutPeriodoExterno = layoutPeriodoExterno
																			+ layoutPeriodoInterno;
																});
												layoutPeriodoExterno = layoutPeriodoExterno
														+ "</div>";
												layoutSugestao = layoutSugestao
														+ layoutPeriodoExterno;
												layoutSugestao = layoutSugestao
														+ "</div>";
												// console.log(layoutSugestao);
												$('#sugestoes').append(
														layoutSugestao);
												i++;
											});
						},
						error : function() {
							console.log("error");
						}
					});
		}
	}

	/*
	 * ============================================== Matricula
	 * ====================================================
	 */

	if ($('body').is('.matricula')) {
		$
				.ajax({
					url : 'http://localhost:8080/sugestao/1',
					headers : {
						'Content-Type' : 'application/x-www-form-urlencoded'
					},
					type : "GET",
					contentType : "application/json; charset=utf-8",
					dataType : 'json',
					async : true,
					success : function(data) {
						$
								.each(
										data,
										function(sugestaoID, sugestao) {
											if (sugestao.escolhida) {
												$('#sugestoes').empty();
												var num = "";
												layoutSugestao = "<div class=\"row\"><div class=\"col s12\"><div class=\"container portfolio center\"><h4 id=\"num-sugestao\">Sugestão de Matrícula Escolhida</h4><h6 id=\"infos-sugestao\">Tempo (em períodos) restante para conclusão: "
														+ sugestao.tempoFormatura
														+ ";<br>Quantidade de disciplinas fora da sua área de preferência: "
														+ sugestao.qtdDisciplinasForaArea
														+ ";</h6><hr></div></div>";
												layoutPeriodoExterno = "<div id=\"periodos\" class=\"row s12 m1 l1 center\">";

												$
														.each(
																sugestao.periodos,
																function(
																		periodosID,
																		periodos) {
																	layoutPeriodoInterno = "<div class=\"row s12 m3 l3 text-center\" style=\"display: inline-block; vertical-align: top;\"><div class=\"col s12 m12 l12 portfolio-holder\">";
																	// console.log(layoutPeriodoInterno);
																	$
																			.each(
																					periodos.disciplinasDoPeriodoDaSugestao,
																					function(
																							disciplinasDoPeriodoDaSugestaoID,
																							disciplinasDoPeriodoDaSugestao) {
																						layoutDisciplina = '<div class=\'disciplina materialboxed white-text center-align '
																								+ disciplinasDoPeriodoDaSugestao.area
																								+ '\'>'
																								+ disciplinasDoPeriodoDaSugestao.nome
																								+ '</div>';
																						// console.log(layoutDisciplina);
																						layoutPeriodoInterno = layoutPeriodoInterno
																								+ layoutDisciplina;
																					});
																	layoutPeriodoInterno = layoutPeriodoInterno
																			+ "</div></div>";
																	// console.log(layoutSugestao);
																	layoutPeriodoExterno = layoutPeriodoExterno
																			+ layoutPeriodoInterno;
																});
												layoutPeriodoExterno = layoutPeriodoExterno
														+ "</div>";
												layoutSugestao = layoutSugestao
														+ layoutPeriodoExterno;
												layoutSugestao = layoutSugestao
														+ "</div>";
												// console.log(layoutSugestao);
												$('#sugestoes').append(
														layoutSugestao);
											}
										});
					},
					error : function() {
						console.log("erro");
					}
				})
	}

})

// $.postJSON = function(url, data, success, args) {
// args = $.extend({
// url: url,
// type: 'POST',
// data: JSON.stringify(data),
// contentType: 'application/json; charset=utf-8',
// dataType: 'json',
// async: true,
// success: success
// }, args);
// return $.ajax(args);
// };
//		

// $(function () {
// if (window.location == window.parent.location) {
// $('#fullscreen').html('<span class="glyphicon
// glyphicon-resize-small"></span>');
// $('#fullscreen').attr('href',
// 'http://bootsnipp.com/mouse0270/snippets/PbDb5');
// $('#fullscreen').attr('title', 'Back To Bootsnipp');
// }
// $('#fullscreen').on('click', function(event) {
// event.preventDefault();
// window.parent.location = $('#fullscreen').attr('href');
// });
// $('#fullscreen').tooltip();
// /* END DEMO OF JS */
//    
// $('.navbar-toggler').on('click', function(event) {
// event.preventDefault();
// $(this).closest('.navbar-minimal').toggleClass('open');
// })
//
// })
