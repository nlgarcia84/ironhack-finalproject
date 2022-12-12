import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./user";

export const useProfilesStore = defineStore("profiles", {
  state: () => ({
    profile: null,
  }),
  actions: {
    async fetchProfile() {
      const { data: profile } = await supabase
        .from("profile")
        .select("*")
        .match({ user_id: useUserStore().user.id });
      if (profile) this.profile = profile[0];
      console.log(this.profile);
      return this.profile;
    },

    async changeProfiles(username, avatar_url, id) {
      const { data, error } = await supabase
        .from("profile")
        .update({
          username: username,
          avatar_url: avatar_url,
        })
        .match({
          user_id: id,
        });
    },
  },
});
