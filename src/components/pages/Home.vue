<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <TweetForm />
      </v-col>
      <v-col cols="12">
        <Timeline />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TweetForm from '@/components/organisms/TweetForm'
import Timeline from '@/components/organisms/Timeline'

export default {
  name: 'Home',
  components: {
    TweetForm,
    Timeline
  }
}
</script>
