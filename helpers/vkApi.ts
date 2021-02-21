import axios from "axios";

class VkApi {
  private PUBLIC_ID = "167289683";
  private getVkToken() {
    return "578517ba4cc0aa33964e59b104a2563cab4138adcc11774f33f13b8bba63a14b28e3170c0e079ce0ead05";
  }

  public async wallPost(message) {
    return await axios.get(
      `https://api.vk.com/method/wall.post?owner_id=-${this.PUBLIC_ID}&message=${encodeURI(
        message
      )}&access_token=${this.getVkToken()}&v=5.50`
    );
  }
}

export default new VkApi();
