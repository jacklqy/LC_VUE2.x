let tokenChange = {
    mounted() {
        let token = localStorage.getItem("token");
        if (!token) {
          this.$router.push("/login");
        }
    },
}


export default tokenChange