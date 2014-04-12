/*
	jAnimator, by Hugo Miard

*/

(function($){

	$.fn.jAnimator = function(){

		// Parses attached elements
		return this.each( function(){

			var inline, rumble_timer, $this = $(this), fade_timer;


			/* --------------- */
			/* INNER FUNCTIONS */
			/* --------------- */

			var f_rumble = function(x_range, y_range, rotation){

				// Variables checking
				var x = (x_range < 0) ? -x_range : x_range,
					y = (y_range < 0) ? -y_range : y_range,
					r = (rotation < 0) ? 1 : rotation;

				// Generates random negative or positive within the range chosen
				var rx = Math.floor(Math.random() * (x+1)) -x/2,
					ry = Math.floor(Math.random() * (y+1)) -y/2,
					rot = Math.floor(Math.random() * (r+1)) -r/2;

				// Checking if inline
				if($this.css('display') === 'inline'){
					inline = true;
					$this.css('display', 'inline-block');
				}

				// Rumble
				$this.css({
					'left': rx+'px',
					'top': ry+'px',
					'-webkit-transform': 'rotate('+rot+'deg)', 
					'-moz-transform': 'rotate('+rot+'deg)', 
					'-ms-transform': 'rotate('+rot+'deg)',
					'-o-transform': 'rotate('+rot+'deg)', 
					'transform': 'rotate('+rot+'deg)'
				});

			};


			var f_fade = function(rate, time){

				// Variables checking
				var r = (rate < 0) ? -rate : rate,
					t = (time < 0) ? -time : time;
					r = (r > 100) ? 50 : r;

				// Fade out
				$this.animate({'opacity': rate/100}, t);

			};



			/* --------------- */
			/* BOUND FUNCTIONS */
			/*---------------- */

			$this.bind({


				'jAnimRumble': function(e, options){

					e.stopPropagation();
					clearInterval(rumble_timer);
					
					// Default values
					var defaults = {
						x: 2,
						y: 2,
						r: 1,
						s: 10,
						duration: 1000
					};

					var p = $.extend(defaults, options);
					rumble_timer = setInterval(function(){
						f_rumble(p.x, p.y, p.r);
					}, p.s);

					setTimeout(function(){
						clearInterval(rumble_timer);
						if(inline){
							$this.css('display', 'inline');
						}
						$this.css({
							'left': 0,
							'top': 0,
							'-webkit-transform': 'rotate(0deg)', 
							'-moz-transform': 'rotate(0deg)', 
							'-ms-transform': 'rotate(0deg)',
							'-o-transform': 'rotate(0deg)',
							'transform': 'rotate(0deg)'
						});

					},p.duration)

				},


				'jAnimRumble_start': function(e, options){

					// Default values
					var defaults = {
						x: 2,
						y: 2,
						r: 1,
						s: 10
					};

					var p = $.extend(defaults, options);

					rumble_timer = setInterval(function(){
						f_rumble(p.x, p.y, p.r);
					}, p.s);
				},


				'jAnimRumble_stop': function(e){

					e.stopPropagation();
					clearInterval(rumble_timer);
					if(inline){
						$this.css('display', 'inline');
					}
					$this.css({
						'left': 0,
						'top': 0,
						'-webkit-transform': 'rotate(0deg)', 
						'-moz-transform': 'rotate(0deg)', 
						'-ms-transform': 'rotate(0deg)',
						'-o-transform': 'rotate(0deg)', 
						'transform': 'rotate(0deg)'
					});
				},


				'jAnimRumble_fade': function(e, options){
					e.stopPropagation();	
					clearInterval(fade_timer);

					// Default values
					var defaults = {
						repeat: true,
						period: 1000,
						rate: 100
					};

					var p = $.extend(defaults, options);

					f_fade(100-p.rate, p.period/2);

					setTimeout(function(){
						f_fade(100, p.period/2)
					}, p.period/2);

					if (p.repeat){

						fade_timer = setInterval(function(){

							f_fade(100-p.rate, p.period/2);

							setTimeout(function(){
								f_fade(100, p.period/2)
							}, p.period/2);

						}, p.period);

					}

				}

			}); // $(this).bind()

		}); // this.each

	};

})(jQuery);