import store from "./index";
import axios from "axios";

store.subscribe(mutation => {
	/* axios'a sonraki requestler için header'a tokeni koy.(set_token mutation'i çalıştıktan sonraki requestler için geçerlidir)*/
	if (mutation.type === "SET_TOKEN") {
		axios.defaults.headers.common[
			"Authorization"
		] = `Bearer ${mutation.payload}`;
		// in here mutation.payload = set_token'in payloadi yani token.

		//

		/* ek olarak local storage'a tokeni kaydet. kullanıcı sekmeyi kapattığında, localdeki tokenle kullanıcı bilgilerini geri alacağız */
		localStorage.setItem("token", mutation.payload);
		sessionStorage.clear();
	}
});
