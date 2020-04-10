<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view />
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Footer from '@/components/footer'
 export default {
   components: {
     Navbar,
     Footer
   },
   watch: {
     '$route' (to) {
       document.title = to.meta.title
     },
   },
   mounted: function() {
       document.title = this.$route.meta.title
   }
 }
</script>
<style lang="scss">
#app {
  background-color: #F2F3F4;
  min-height:100vh;
}
input,
label,
select,
button,
textarea
{
	margin:0;
	border:0;
	padding:0;
	display:inline-block;
	vertical-align:middle;
	white-space:normal;
	background:none;
	line-height:1;
}
input:focus, textarea:focus
{
	outline:0;
}
textarea
{
	vertical-align:top;
	overflow:auto;
}
::placeholder {
  color: #414141;
  opacity: 1;
}
:-ms-input-placeholder {
  color: #414141;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.slide-enter {
  transform: translateY(30px);
}
.slide-leave-to {
  opacity: 0;
}
.slide-leave-active {
  transition: opacity .5s;
}
.slide-enter-active {
  transition: transform .5s;
}
.slide-move {
  transition: all .5s;
}
.view-wrapper {
  min-height: 80vh;
}
</style>
