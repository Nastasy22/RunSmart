$(document).ready(function(){
		$('.carousel__inner').slick({
				speed: 1200,
				prevArrow: '<button type="button" class="slick-prev"><span class="icon-left"></span></button>',
				nextArrow: '<button type="button" class="slick-next"><span class="icon-right"></span></button>',
				responsive: [
						{
							breakpoint: 992,
							settings: {
								dots: true,
								arrows: false,
							},
						},
				]
		});

		$('ul.catalog__tabs').on('click', 'li:not(catalog__tab_active)', function() {
			$(this)
				.addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
				.closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
		});

		function toggleSlide(item) {
			$(item).each(function(i) {
				$(this).on('click', function(e) {
					e.preventDefault();
					$('.catalog-item__goods').eq(i).toggleClass('catalog-item__goods_active');
					$('.catalog-item__detalis').eq(i).toggleClass('catalog-item__detalis_active');
				})
			});
		};
		toggleSlide('.catalog-item__link');
		toggleSlide('.catalog-item__back');

		$('[data-modal=consultation]').on('click', function() {
			$('.overlay, #consultation').fadeIn('slow')
		});

		$('.button_mini').on('click', function() {
			$('.overlay, #order').fadeIn('slow')
		});

		$('.modal__close').on('click', function() {
			$('.overlay, #consultation, #order, #thanks').fadeOut('slow')
		});

		$('.button_mini').each(function(i) {
			$(this).on('click', function() {
				$('#order .modal__descr').text(
					$('.catalog-item__subtitle').eq(i).text()
				)
			})
		});

		function validateForm(form) {
			$(form).validate({
				rules: {
					name: {
						required: true,
						minlength: 2
					},
					phone: "required",
					email: {
						required: true,
						email: true
					}
				},
				messages: {
					name: {
						required: "Пожалуйста, введите своё имя",
						minlength: jQuery.validator.format("Введите {0} и более символов!")
					},
					phone: "Пожалуйста, введите свой номер телефона",
					email: {
						required: "Пожалуйста, введите свой email",
						email: "Неправильно введен адрес email (пример name@domain.com)"
					}
				}
			});
		}
		validateForm('#consultation form');
		validateForm('#consultation-form');
		validateForm('#order form');

		$('input[name=phone]').mask("+8 (999) 999-99-99");

		$('form').submit(function(e) {
			e.preventDefault();
			$.ajax({
				type: "POST",
				url: "mailer/smart.php",
				data: $(this).serialize()
			}).done(function() {
                $(this).find("input").val("");
                $('#consultation, #order').fadeOut('slow');
                $('.overlay, #thanks').fadeIn('slow');
				$('form').trigger('reset');
			});
			return false;
		});

		$(window).scroll(function() {
			if ($(this).scrollTop() > 1000) {
				$('.pageup').fadeIn();
			} else {
				$('.pageup').fadeOut();
			}
		});

		$("a[href^='#']").click(function(){
			const _href = $(this).attr("href");
			$("html, body").animate({scrollTop: $(_href).offset().top+"px"});
			return false;
		});
});