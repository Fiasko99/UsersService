module.exports = async (worker, options) => {
  const user = await Users.findOne({
    where: {
      login: worker.orgName
    }
  })
  console.log(user);
  if (user.role != 'organization') {
    throw new Error("Role must be organization")
  }
}