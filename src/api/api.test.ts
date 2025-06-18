import * as api from "./api";

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ foo: "bar" }),
  })
) as jest.Mock;

describe("api", () => {
  it("fetchLastSongs returns data", async () => {
    const data = await api.fetchLastSongs("eins");
    expect(data).toEqual({ foo: "bar" });
    expect(fetch).toHaveBeenCalledWith(
      "https://api.laut.fm/station/eins/last_songs"
    );
  });

  it("fetchCurrentSong returns data", async () => {
    const data = await api.fetchCurrentSong("eins");
    expect(data).toEqual({ foo: "bar" });
    expect(fetch).toHaveBeenCalledWith(
      "https://api.laut.fm/station/eins/current_song"
    );
  });

  it("fetchSchedule returns data", async () => {
    const data = await api.fetchSchedule("eins");
    expect(data).toEqual({ foo: "bar" });
    expect(fetch).toHaveBeenCalledWith(
      "https://api.laut.fm/station/eins/schedule"
    );
  });

  it("fetchListeners returns data", async () => {
    const data = await api.fetchListeners("eins");
    expect(data).toEqual({ foo: "bar" });
    expect(fetch).toHaveBeenCalledWith(
      "https://api.laut.fm/station/eins/listeners"
    );
  });
});