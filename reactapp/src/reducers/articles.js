export default function(wishList = [], action){

    if(action.type == 'addArticle'){
        var wishListCopy = [...wishList]

        var findArticle = false

        for(let i=0;i<wishListCopy.length;i++){
            if(wishListCopy[i].title == action.articleLiked.title){
                findArticle = true
            }
        }

        if(!findArticle){
            wishListCopy.push(action.articleLiked)
            fetch('/addToWhishlist', {
                method:"POST",
                headers: {'Content-Type':'application/x-www-form-urlencoded'},
                body: `title=${action.articleLiked.title}&img=${action.articleLiked.urlToImage}&description=${action.articleLiked.description}&token=${action.userToken}`
            })

            console.log(action.userToken)
        }
        
        return wishListCopy
    } else if(action.type == 'deleteArticle'){
        var wishListCopy = [...wishList]
        var position = null

        for(let i=0;i<wishListCopy.length;i++){
            if(wishListCopy[i].title == action.title){
                position = i
            }
        }
        if(position != null){
            wishListCopy.splice(position,1)
        }

        return wishListCopy
        
    } else {
        return wishList
    }
}