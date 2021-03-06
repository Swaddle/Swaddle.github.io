{-# LANGUAGE OverloadedStrings #-}
import Data.Monoid (mappend)
import Hakyll
import Control.Monad
import Control.Applicative

import Text.Pandoc
import Text.Pandoc.Options

import qualified Data.ByteString.Lazy.Char8 as C8
import           Text.Jasmine

foldMapA :: (Applicative f, Foldable t, Monoid m) => (a -> f m) -> t a -> f m
foldMapA f = foldr (liftA2 mappend . f) (pure mempty)

pandocMathCompiler :: Compiler (Item String) 
pandocMathCompiler =
    let mathExtensions = [Ext_latex_macros]
        defaultExtensions = writerExtensions defaultHakyllWriterOptions
        newExtensions = foldr enableExtension defaultExtensions mathExtensions
        writerOptions = defaultHakyllWriterOptions {
                          writerExtensions = newExtensions,
                          writerHTMLMathMethod = MathJax ""}
    in pandocCompilerWith defaultHakyllReaderOptions writerOptions

pandocLatexCompiler :: Compiler (Item String) 
pandocLatexCompiler =
    let mathExtensions = [Ext_latex_macros]
        defaultExtensions = writerExtensions defaultHakyllWriterOptions
        newExtensions = foldr enableExtension defaultExtensions mathExtensions
        writerOptions = defaultHakyllWriterOptions {
                            writerExtensions = newExtensions,
                            writerHTMLMathMethod = MathJax "",
                            writerTableOfContents = True,
                            writerSectionDivs = True}
    in pandocCompilerWith defaultHakyllReaderOptions writerOptions

compressJsCompiler :: Compiler (Item String)
compressJsCompiler = do
    s <- getResourceString
    let minifyJS = C8.unpack . minify . C8.pack . itemBody
    return $ itemSetBody (minifyJS s) s
    
postCtx :: Context String
postCtx =
    dateField "date" "%Y, %B %e" `mappend`
    defaultContext

matchMathRules ::  Identifier -> Identifier -> Pattern -> Rules ()
matchMathRules temp1 temp2 pattern = match pattern $ do
    route $ setExtension "html"
    compile $ pandocLatexCompiler
        >>= loadAndApplyTemplate temp1 postCtx
        >>= loadAndApplyTemplate temp2 postCtx
        >>= relativizeUrls

matchNotes = matchMathRules "templates/notes.html" "templates/default.html" 

main :: IO ()
main = do
    hakyll $ do
        match "images/*" $ do
            route   idRoute
            compile copyFileCompiler

        match "css/*" $ do
            route   idRoute
            compile compressCssCompiler
        
        match "js/*" $ do
            route   idRoute
            compile compressJsCompiler

        match (fromList ["about.rst", "contact.markdown"]) $ do
            route   $ setExtension "html"
            compile $ pandocMathCompiler
                >>= loadAndApplyTemplate "templates/default.html" defaultContext
                >>= relativizeUrls
        
        matchNotes "notes/*.tex"

        match "posts/*" $ do
            route $ setExtension "html"
            compile $ pandocMathCompiler
                >>= loadAndApplyTemplate "templates/post.html"    postCtx
                >>= loadAndApplyTemplate "templates/default.html" postCtx
                >>= relativizeUrls

        create ["post-archive.html"] $ do
            route idRoute
            compile $ do
                posts <- recentFirst =<< loadAll "posts/*"
                let archiveCtx =
                        listField "posts" postCtx (return posts) `mappend`
                        constField "title" "archives"            `mappend`
                        defaultContext
                makeItem ""
                    >>= loadAndApplyTemplate "templates/post-archive.html" archiveCtx
                    >>= loadAndApplyTemplate "templates/default.html" archiveCtx
                    >>= relativizeUrls

        create ["notes-archive.html"] $ do
            route idRoute
            compile $ do
                posts <- recentFirst =<< loadAll "notes/*"
                let archiveCtx =
                        listField "notes" postCtx (return posts) `mappend`
                        constField "title" "notes"            `mappend`
                        defaultContext
                makeItem ""
                    >>= loadAndApplyTemplate "templates/notes-archive.html" archiveCtx
                    >>= loadAndApplyTemplate "templates/default.html" archiveCtx
                    >>= relativizeUrls

        match "index.html" $ do
            route idRoute
            compile $ do
                notes <- recentFirst =<< loadAll "notes/*"
                let indexCtx =
                        listField "notes" postCtx (return notes) `mappend`
                        constField "title" "new"                `mappend`
                        defaultContext

                posts <- recentFirst =<< loadAll "posts/*"
                let indexCtx =
                        listField "posts" postCtx (return posts) `mappend`
                        constField "title" "new"                `mappend`
                        defaultContext

                getResourceBody
                    >>= applyAsTemplate indexCtx
                    >>= loadAndApplyTemplate "templates/default.html" indexCtx
                    >>= relativizeUrls

        match "templates/*" $ compile templateCompiler
