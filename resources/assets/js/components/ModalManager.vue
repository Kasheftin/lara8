<template>
	<div v-if="enabled">
		<transition appear name="vue-modal-backdrop" @before-enter="activate" @after-leave="deactivate">
			<div v-if="visible" class="vue-modal-backdrop" @click="$bus.$emit('hideModals')"></div>
		</transition>
		<transition-group appear name="vue-modal" tag="div">
			<div v-for="modal in modals" :key="modal.name" class="vue-modal modal d-flex justify-content-center align-items-center"  @click.self="$bus.$emit('hideModal',modal.name)">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<div class="modal-title">{{modal.options.modalTitle}}</div>
							<button class="close" aria-label="close" @click="$bus.$emit('hideModal',modal.name)">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
							<component :is="modal.componentName" v-bind="modal.options" />
						</div>
						<div class="modal-footer" v-if="modal.options.showBottomClose">
							<button class="btn btn-secondary" @click="$bus.$emit('hideModal',modal.name)">Close</button>
						</div>
					</div>
				</div>
			</div>
		</transition-group>
	</div>
</template>

<script>

import Login from "#/modals/Login.vue";
import Signup from "#/modals/Signup.vue";
import Logout from "#/modals/Logout.vue";

import config from "~/config";

const getScrollbarWidth = function() {
	const outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.width = "100px";
    outer.style.msOverflowStyle = "scrollbar";
    document.body.appendChild(outer);
    const widthNoScroll = outer.offsetWidth;
    outer.style.overflow = "scroll";
    const inner = document.createElement("div");
    inner.style.width = "100%";
    outer.appendChild(inner);
    const widthWithScroll = inner.offsetWidth;
    outer.parentNode.removeChild(outer);
    return widthNoScroll - widthWithScroll;
}

const Modal = function(name,options) {
	this.name = name;
	this.componentName = name.substr(0,1).toUpperCase()+name.substr(1);
	this.options = _.extend({},config.modals.default,config.modals[name],options);
	this.modalTitle = this.options.modalTitle;
}

export default {
	data: function() {
		return {
			modals: [],
			enabled: false,
			visible: false
		}
	},
	computed: {
		modalsCnt: function() {
			return this.modals.length;
		}
	},
	watch: {
		modalsCnt: function(cnt) {
			if (cnt>0) {
				this.enabled = true;
				this.visible = true;
			}
			else {
				this.visible = false;
			}
		}
	},
	methods: {
		activate: function(el) {
			const bodyHasScrollbar = $("body").height() > $(window).height();
			$("body").addClass("modal-open").css("padding-right",bodyHasScrollbar?this.scrollbarWidth+"px":0);
		},
		deactivate: function() {
			$("body").removeClass("modal-open").css("padding-right",0);
			this.enabled = false;
		},
		lastModalFocus: function() {
			this.$nextTick(() => {
				$(this.$el).find(".modal:last-child input,select,textarea").eq(0).focus();
			});
		}
	},
	mounted: function() {
		this.scrollbarWidth = getScrollbarWidth();
		this._switchModal = (name,options) => {
			const i = _.findIndex(this.modals,m => m.name == name);
			if (i===0||i>0) {
				this.modals.splice(i,1);
			}
			else {
				this.modals.splice(0,this.modals.length);
				this.modals.push(new Modal(name,options));
				this.lastModalFocus();
			}
		}
		this._hideModals = () => {
			this.modals.splice(0,this.modals.length);
		}
		this._hideModal = (name) => {
			const i = _.findIndex(this.modals,m => m.name == name);
			if (i===0 || i>0) {
				this.modals.splice(i,1);
			}
		}
		this.$bus.$on("switchModal",this._switchModal);
		this.$bus.$on("hideModals",this._hideModals);
		this.$bus.$on("hideModal",this._hideModal);
	},
	beforeDestroy: function() {
		this._switchModal && this.$bus.$off("switchModal",this._switchModal);
		this._hideModals && this.$bus.$off("hideModals",this._hideModals);
		this._hideModal && this.$bus.$off("hideModal",this._hideModal);
	},
	components: {
		Login: Login,
		Signup: Signup,
		Logout: Logout
	}
}

</script>

<style lang="scss">

@mixin fixed-over {
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	z-index: 1040;
}

.vue-modal-backdrop {
	@include fixed-over;
	background-color: rgba(0,0,0,0.5);
	&-enter-active,&-leave-active {
		transition: opacity 0.5s ease;
	}
	&-enter,&-leave-to {
		opacity: 0;
	}
}

.vue-modal-container {
	@include fixed-over;
	overflow-x: hidden;
	overflow-y: auto;
	&-enter-active,&-leave-active {
		transition: opacity 0.5s ease;
	}
	&-enter,&-leave-to {
		opacity: 0;
	}
}

.vue-modal {
	&-enter-active,&-leave-active {
		transition: opacity 0.5s ease;
	}
	&-enter {
		opacity: 0;
		.modal-dialog {
			transform: translateX(50%);
		}
	}
	&-leave-to {
		opacity: 0;
		.modal-dialog {
			transform: translateX(-50%);
		}
	}
	.modal-dialog {
		flex-basis: 500px;
		transition: all 0.5s ease;
		margin: auto;
	}
}

</style>