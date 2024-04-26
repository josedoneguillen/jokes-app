<template>
  <header class="shadow-sm p-2">
    <div class="container d-flex  align-items-center justify-content-between">
      <img src="./assets/logo.svg" width="120" height="auto" alt="Logo">
      <h1>Jokes App</h1>
    </div>
  </header>
  <section class="py-5">
    <div class="container">
      <!-- List jokes component in ./components/jokes for clean architecture -->
      <ListJokes></ListJokes>
    </div>

  </section>

  <footer class="py-2">
    <div class="container text-center">
      <p class="m-0">© 2024 Jokes App. All rights reserved. Powered with coffee by <a href="https://josedone.com"
          target="_blank">Jose Done</a>.</p>
    </div>
  </footer>
</template>

<script>
import ListJokes from './components/jokes/ListJokes.vue';

export default {
  name: 'App',
  components: {
    ListJokes
  }
}
</script>
