<template>
  <div id="app">
    <header class="header">
      <h1>Tiny UI library</h1>
    </header>
    <div id="nav">
      <router-link to="/">Home</router-link>
      |
      <router-link to="/modal">Modal</router-link>
      |
      <router-link to="/button">Button</router-link>
      |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="less">
  @primary-color: #007bff;
  @secondary-color: #6c757d;
  @success-color: #5cb85c;
  @info-color: #5bc0de;
  @warning-color: #ffc107;
  @danger-color: #dc3545;
  @dark-color: #343a40;
  @lighten-success: lighten(@success-color, 15%);

  *,
  *:before,
  *:after {
    margin: 0;
    padding: 0;
  }

  body {
    font-family: "Roboto Light", sans-serif;
  }

  #app {
    background-color: @success-color;
    color: @dark-color;

    main {
      min-height: 100vh;

      .section {

        padding: 50px;

        .section-brand {
          color: @success-color;
          background: @dark-color;
          box-shadow: 8px -4px 8px 1px rgba(@dark-color, .5);

          padding: 1rem 2.5rem;

          border: 1px solid @dark-color;
          border-radius: 0 16px;
        }

        .section-inner {
          width: 90%;

          background: @lighten-success;

          margin: 10px auto 0;
          padding: .5rem;

          .row {
            width: 100%;

            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;

            h3 {
              width: 100%;

              padding: 10px 0 5px;

              border-bottom: 1px solid @dark-color;
            }
          }
        }
      }
    }
  }
</style>
