import Vue from "vue";

const Form = function(options) {
	this.loading = false;
	this.showForm = true;
	this.showRedirectTimer = false;
	this.hideOnSuccess = false;
	this.requestType = "post";
	this.url = "/";
	this.errors = {};
	this.error = undefined;
	this.success = undefined;
	this.redirectTo = undefined;
	this.redirectDelay = 0;
	this.autoSend = undefined;
	_.extend(this,options);

	if (this.autoSend>0 || this.autoSend === 0) {
		this._autoSendTimeout = setTimeout(() => {
			this.send();
		},this.autoSend*1000);
	}
}

Form.prototype.beforeSend = function() {
	return true;
}

Form.prototype.beforeSendAsync = function() {
	return new Promise((resolve,reject) => {
		resolve();
	});
}

Form.prototype.beforeError = function(error) {
	if (error.response && typeof error.response == "object" && error.response.data) {
		_.each(error.response.data,(value,field) => {
			Vue.set(this.errors,field,value);
		});
	}
	else {
		this.error = error.message;
	}
}

Form.prototype.beforeSuccess = function(response) {
	const data = response.data||{};
	this.success = data.success || data.message;
	this.redirectTo = data.redirect_to;
	if (this.hideOnSuccess) {
		this.showForm = false;
	}
	if (this.redirectTo) {
		if (this.redirectDelay>0) {
			this.showRedirectTimer = true;
			const run = () => {
				this._successTimeout = setTimeout(() => {
					if (this.redirectDelay<=0) {
						this.redirect();
					}
					else {
						this.redirectDelay--;
						run();
					}
				},Math.min(this.redirectDelay*1000,1000));
			}
			run();
		}
		else {
			this.redirect();
		}
	}
}

Form.prototype.onError = function(response) {

}

Form.prototype.onSuccess = function(response) {

}

Form.prototype.send = function(e) {
	e && e.preventDefault();
	this._autoSendTimeout && clearTimeout(this._autoSendTimeout);
	if (!this.beforeSend()) return;
	this.beforeSendAsync().then(() => {
		this.loading = true;
		this.error = undefined;
		this.errors = {};
		let requestType = typeof this.requestType === "function" ? this.requestType() : this.requestType;
		axios[requestType](this.url,this.data)
			.then(response => {
				this.loading = false;
				this.beforeSuccess(response);
				this.onSuccess(response);
			})
			.catch(response => {
				this.loading = false;
				this.beforeError(response);
				this.onError(response);
			});
	});
}

Form.prototype.isInvalid = function(field) {
	return this.errors && this.errors.hasOwnProperty(field);
}

Form.prototype.getError = function(field) {
	if (this.isInvalid(field)) {
		return this.errors[field];
	}
}

Form.prototype.clearError = function(e) {
	const name = event.target.name;
	if (name && this.errors.hasOwnProperty(name)) {
		delete this.errors[name];
	}
}

Form.prototype.redirect = function(e) {
	e && e.preventDefault();
	if (this.redirectTo) {
		document.location.href = this.redirectTo;
	}
}

Form.prototype.beforeDestroy = function() {
	// TODO: update for different success behaviors
	this._autoSendTimeout && clearTimeout(this._autoSendTimeout);
	if (this._successTimeout) {
		clearTimeout(this._successTimeout);
		this.redirect();
	}
}

export default Form;