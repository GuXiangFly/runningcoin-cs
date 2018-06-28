package club.runningcoin.repository;

import club.runningcoin.domain.GroupTable;
import org.hibernate.annotations.SQLDelete;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.*;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data JPA repository for the GroupTable entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GroupTableRepository extends JpaRepository<GroupTable, Integer> {

    @Override
    @Query(value = "select * from `Group`",nativeQuery = true)
    List<GroupTable> findAll();

    @Override
    @Query(value = "delete from `Group` where GroupId= ?1 ",nativeQuery = true)
    void deleteById(Integer id);

    /**
     * can not generate pageable list because of the id is GroupId
     * @param pageable
     * @return
     */
    @Override
    @Query(
        value = "select * from `Group` order by GroupId \n-- #pageable\n",
        countQuery = "select count (*) from `Group`",
        nativeQuery = true
    )
    Page<GroupTable> findAll(Pageable pageable);

    @Override
    @Query(value = "select * from `Group` where GroupId = ?1", nativeQuery = true)
    Optional<GroupTable> findById(Integer id);
}
