<template>
  <div class="control-news-table">
    <div class="container">
      <div v-if="feed.length === 0" class="control-news__none">Нет добавленных новостей</div>
      <div class="control-news-table__menu-top">
        <div class="control-news-table__name">Управление</div>
        <button class="button control-news-table__button" @click="onNewsAddClick">Добавить новость</button>
      </div>
      <div id="newNews" class="control-news-table__tabs">
        <div class="tab-news-table tab-news-table__student" @click="onStudentsTableClick">
          <div class="tab-news-table__title ">Список студентов</div>
        </div>
        <div class="tab-news-table tab-news-table__admin" @click="onAdminClick">
          <div class="tab-news-table__title">Администраторы</div>
        </div>
        <div class="tab-news-table tab-news-table__news">
          <div class="tab-news-table__title tab-news-table__title-active">Новости</div>
          <div class="tab-news-table__line"></div>
        </div>
      </div>

      <div class="control-news-table__table">
        <div class="control-news-table__title">Новости</div>
        <div class="control-news-table__wrapper">
          <News
              class="control-news-table-block__card"
              v-for="news in feed"
              :key="news.id"
              :news_data="news"
          />
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import News from "@/views/feed/News";
import {mapActions} from "vuex";
import router, {PathAdmin, PathControl, PathNewsAdd} from "@/router";


export default {
  name: "ControlNewsTable",
  components: {
    News,
  },
  data: () => ({
    feed: []
  }),
  computed: {},
  methods: {
    ...mapActions(['GET_UNPUBLISHED_FEED_FROM_API']),
    onAdminClick() {
      if (this.$route.path === PathAdmin) {
        return
      }
      router.push({path: PathAdmin})
    },
    onStudentsTableClick() {
      if (this.$route.path === PathControl) {
        return
      }
      router.push({path: PathControl})
    },
    onNewsAddClick() {
      if (this.$route.path === PathNewsAdd) {
        return
      }
      router.push({path: PathNewsAdd})
    }
  },
  mounted() {
    this.GET_UNPUBLISHED_FEED_FROM_API().then(response => {
      this.feed = response.feed
    })
  }
}
</script>

<style>
.control-news-table {
  background-color: #FFFFFF;
}

.control-news-table__menu-top {
  display: flex;
  padding-top: 210px;
  align-items: center;
  justify-content: space-between;
}

.control-news-table__name {
  font-family: 'RobotoBold', sans-serif;
  font-weight: 700;
  font-size: 30px;
  line-height: 35px;
  color: #000000;
}

.control-news-table__button {
  width: 187px;
}
.control-news-table__tabs {
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  margin-top: 40px;
}

.tab-news-table {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 30px;
  color: #242A35;
  cursor: pointer;
}

.tab-news-table__title {
  font-size: 18px;
  line-height: 21px;
  margin-bottom: 6px;
  padding: 0 10px;
  /*opacity: 0.3;*/
}

.tab-news-table__title-active {
  opacity: 1;
}

.tab-news-table__line {
  width: 100%;
  height: 4px;
  background: #074692;
  border-radius: 4px;
}

.control-news-table__table {
  margin-bottom: 20px;
}

.control-news-table__title {
  font-family: "RobotoMedium", sans-serif;
  font-weight: 500;
  font-size: 30px;
  line-height: 35px;
  color: #242A35;
  margin-bottom: 40px;
}

.control-news-table__wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.control-news__none {
  font-weight: 300;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
  margin-left: 10px;
}

.control-news-table-block__card {
  margin-bottom: 40px;
}
</style>