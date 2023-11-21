export const updateProfileHistory = (profileData) => {
  const profile = {
    profileId: profileData.profile_id,
    country: profileData.country_code,
    alias: profileData.alias
  }
  const searchHistory = window.localStorage.getItem('visitedProfiles') || null
  if (searchHistory === null) {
    const newHistory = [profile]
    window.localStorage.setItem('visitedProfiles', JSON.stringify(newHistory))
  } else {
    const visitedProfilesObject = JSON.parse(searchHistory)
    const profileExists = visitedProfilesObject.find((profile) => profile.profileId === profileData.profile_id)
    console.log(profileExists)
    // if the profile does not exist in the list do:
    if (profileExists === undefined) {
      // if the list have less than 10 profiles do:
      if (visitedProfilesObject.length < 10) {
        visitedProfilesObject.unshift(profile)
        window.localStorage.setItem('visitedProfiles', JSON.stringify(visitedProfilesObject))
      } else {
        visitedProfilesObject.pop()
        visitedProfilesObject.unshift(profile)
        window.localStorage.setItem('visitedProfiles', JSON.stringify(visitedProfilesObject))
      }
    } else {
      // Put the profile at the top of the list
      const newObject = visitedProfilesObject.filter((profile) => profile.profileId !== profileExists.profileId)
      newObject.unshift(profileExists)
      window.localStorage.setItem('visitedProfiles', JSON.stringify(newObject))
    }
  }
}

export const getProfilesHistory = () => {
  const searchHistory = window.localStorage.getItem('visitedProfiles') || null
  if (searchHistory === null) {
    return null
  } else {
    const visitedProfilesObject = JSON.parse(searchHistory)
    return visitedProfilesObject
  }
}
