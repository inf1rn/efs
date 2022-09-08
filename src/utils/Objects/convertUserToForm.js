export const convertUserToForm = userData => {
    return {
        email: userData.email,
        firstName: userData.first_name,
        lastName: userData.last_name,
        secondName: userData.second_name,
        cityName: userData.city?.title,
        regionName: userData.region?.title,
        regionId: userData.region?.id,
        cityId: userData.city?.id,
        organizationId: userData.organization?.id,
        organizationName: userData.organization?.title,
        positionId: userData.position?.id,
        positionName: userData.position?.title,
        image: userData.image,
        roles: userData.roles
    }
}