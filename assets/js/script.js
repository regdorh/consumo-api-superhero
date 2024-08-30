let heroStats_arr = [];
$(function () {
	$('#btn-buscar').click(function () {
		buscarHero();
		$('#form-title').fadeOut(600);
		$('#form-label').fadeOut(750);
		$('#form-title').fadeIn(600);
		$('#form-label').fadeIn(750);
		$('#form_title').fadeOut(600);
		$('#form-label').fadeOut(750);
		$('#form_title').fadeIn(600);
		$('#form-label').fadeIn(750);
	});

	function buscarHero() {
		let id_Hero = $('#inputBusqueda').val();
		if (validacion(id_Hero) == false) {
			errorInput();
			return;
		}
		getHero(id_Hero);
	}

	function validacion(id) {
		let expression = /^\d{1,3}$/;
		if (expression.test(id)) {
			return true;
		}
		return false;
	}

	function errorInput() {
		alert('Elige un número válido');
		$('#inputBusqueda').focus();
	}

	function getHero(id) {
		$.ajax({
			type: 'GET',
			url: `https://superheroapi.com/api.php/531892024589180/${id}`,
			success: function (response) {
				$('#heroId').html(newCard(response));
				$('#inputBusqueda').val('');
				$('#inputBusqueda').focus();
				cleanHeroArray();
				recorrerPowerStats(response);
				statsChart(response);
			},
			error: function (error) {
				console.log(error);
			},
		});
	}
	
	function newCard(hero) {
		let card = `
    <div class="card pb-2 bg-black text-white g-0 shadow w-100">
                <div class="row">
                    <div class="col-md-5">
                        <img src="${hero.image.url}" class="img-fluid rounded-start"/>
                    </div>
                    <div class="col-md-7">
                        <div class="card-header font-monospace">Héroe ID: ${hero.id}</div>
                        <div class="card-title">
                            <h5 class="">Nombre: ${hero.name}</h5>
                        </div>
                        <ul class='list-group list-group-flush fs-6'>
                            <li class="list-group-item text-bg-warning" style="font-size: 15px">Conexiones: ${hero.connections['group-affiliation']}</li>
                            <li class="list-group-item text-bg-warning" style="font-size: 15px">Publicado por: ${hero.biography.publisher}</li>
                            <li class="list-group-item text-bg-warning" style="font-size: 15px">Ocupación: ${hero.work.occupation}</li>
                            <li class="list-group-item text-bg-warning" style="font-size: 15px">Primera aparición: ${hero.biography['first-appearance']}</li>
                            <li class="list-group-item text-bg-warning" style="font-size: 15px">Altura: ${hero.appearance.height[1]}</li>
                            <li class="list-group-item text-bg-warning" style="font-size: 15px">Peso: ${hero.appearance.weight[1]}</li>
                            <li class="list-group-item text-bg-warning" style="font-size: 15px">Alias: ${hero.biography.aliases}</li>
                        </ul>
                        
                    </div>
                </div>
            </div>
            `;
		return card;
	}
	function cleanHeroArray() {
		heroStats_arr = [];
	}

	function recorrerPowerStats(hero) {
		Object.entries(hero.powerstats).forEach(([key, value]) => {
			let statsHero = {
				label: key,
				y: parseInt(value),
			};
			heroStats_arr.push(statsHero);
			// console.log(heroStats_arr);
		});
	}

	function statsChart(hero) {
		var options = {
			animationEnabled: true,
			animationDuration: 2000,
			backgroundColor: null,
			theme: 'dark2',
			title: {
				text: `Estadísticas de ${hero.name}`,
			},
			data: [
				{
					type: 'pie',
					startAngle: 45,
					showInLegend: 'true',
					legendText: '{label}',
					indexLabel: '{label} ({y})',
					dataPoints: heroStats_arr,
				},
			],
		};
		$('#chartContainer').CanvasJSChart(options);
	}
	
});