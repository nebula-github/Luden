import { Endpoints } from '@/api/Endpoints'
import { GridList } from '@/components/list'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { toast } from '@/components/ui/use-toast'
import axios from 'axios'
import { Search, PlusCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useMediaQuery } from 'usehooks-ts'

const RpgsHome = () => {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [rpgsName, setRpgsName] = useState('')
  const [rpgs, setRpgs] = useState([])

  useEffect(() => {
    GetRpgs()
  }, [])

  const GetRpgs = () => {
    axios
      .get(Endpoints.GetAllRpgs + `?rpgName=${rpgsName}`)
      .then((response) => {
        setRpgs(response.data?.data ?? [])
      })
      .catch((error) => {
        toast({
          title: error.response.data.title,
          description: error.response.data.detail,
          variant: 'destructive',
        })
      })
  }
  return (
    <>
      <div>
        <h1 className="text-2xl">Rpgs</h1>
        <p className="text-muted-foreground">Find or add a new Rpg</p>
      </div>
      <Separator className="my-3" />
      <div className="flex col items-center justify-center h-full w-full">
        <div className="relative w-[85%]">
          <Button
            variant="link"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={GetRpgs}
          >
            <Search className="text-input" />
          </Button>
          <Input
            placeholder="Search for a rpg"
            onChange={(e) => {
              setRpgsName(e.target.value)
            }}
          />
        </div>
        <Link to="create" className="mx-3 w-[15%]">
          <Button className="p-0 w-full">
            <PlusCircle />
            {!isMobile && <p className="text-sm ms-1">Add</p>}
          </Button>
        </Link>
      </div>
      {rpgs.length > 0 ? (
        <GridList items={rpgs} />
      ) : (
        <p className="text-md text mt-1">No rpgs found</p>
      )}
    </>
  )
}

export default RpgsHome
