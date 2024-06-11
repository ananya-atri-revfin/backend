export const jwtConfig = {
    secret: 'BkDlg8evLpMn5IorM3XP4fav5oHzTIcjXbjPFLDXNdGxhn7cPZ0y2mQ3h9ePlYfMM11tW6KRrvP0JtJmf9pj7GKDSBAka8cZeg3CEj//fRkRhyH0ZYz8W+/nYfHPyya+AjHdWbeABekh6HWIB3IecMsRAPEdAoCCRCeklAAYy+nQpck4j8ioZhSPLzo9c9a4zHaFg701VySN6NIlQC4mOsFfKJ1DTiyEw1z7c8Byet0jG5IVVnvcjh1XdWKc96+LhC+YFOQAkkdBg6ciusufobEksSAFXoLty20t5s50UNqWPgU9gxLcgynjoFb6i3lxRnh/mbjAfqjn3FEPlTGuJQ==', // node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"
    access: {
        ttl: 3600, // 1 hour
    },
    refresh: {
        ttl: 86400, // 1 day
    }
}