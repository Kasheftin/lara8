import velocity from "velocity-animate";
import $ from "jquery";

export default {
	methods: {
		animHeightBeforeEnter: function(el) {
			el.style.height = 0;
			el.style.overflow = "hidden";
		},
		animHeightEnter: function(el,done) {
			velocity(el,{height:$(el).children().eq(0).outerHeight(true)},{duration:this.duration,complete:() => {
				el.style.height = "auto";
				el.style.overflow = "auto";
				done();
			}});
		},
		animHeightLeave: function(el,done) {
			el.style.overflow = "hidden";
			velocity(el,{height:0},{duration:this.duration,complete:done});
		}
	}
}